"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { max } from "@huggingface/transformers";
var webllm = require("@mlc-ai/web-llm");
function setLabel(id, text) {
    var label = document.getElementById(id);
    if (label == null) {
        throw Error("Cannot find label " + id);
    }
    label.innerText = text;
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        function generate_options(text, inference_engine, element_id, topk, max_output) {
            return __awaiter(this, void 0, void 0, function () {
                var textElement, reply, combinedText;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            textElement = document.getElementById(element_id);
                            if (textElement) {
                                textElement.value = "Loading...";
                            }
                            else {
                                console.error("Cannot find textarea with id " + element_id);
                            }
                            return [4 /*yield*/, inference_engine.completions.create({
                                    prompt: "text: " + text,
                                    // below configurations are all optional
                                    echo: false,
                                    n: 1,
                                    max_tokens: max_output,
                                    logprobs: true,
                                    top_logprobs: topk,
                                    //best_of: 5, // option not yet supported
                                })];
                        case 1:
                            reply = _a.sent();
                            combinedText = "";
                            if (reply.choices && reply.choices[0].logprobs && reply.choices[0].logprobs.content && reply.choices[0].logprobs.content[0].top_logprobs) {
                                reply.choices[0].logprobs.content[0].top_logprobs.forEach(function (choice) {
                                    combinedText += choice.token.trim() + "\n";
                                });
                            }
                            else {
                                console.error("Unexpected reply structure", reply);
                            }
                            textElement.value = combinedText;
                            console.log(reply);
                            return [2 /*return*/];
                    }
                });
            });
        }
        var initProgressCallback, model_llama_3_1, model_llama_3_1_instruct, model_llama_3_2_instruct, model_hermes_3_llama, model_mistral_7_instruct, model_gemma_2, model_qwen, model_zephyr, model_redpajama_incite, appConfig, engine_zephyr, engine_qwen, engine_hermes_3_llama, engine_llama_3_2_instruct, engine_llama_3_1_instruct, engine_llama_3_1, maxWordsSlider, maxWords, maxOutput, inputText;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    initProgressCallback = function (report) {
                        setLabel("init-label", report.text);
                    };
                    model_llama_3_1 = "Llama-3.1-8B-q4f32_1-MLC";
                    model_llama_3_1_instruct = "Llama-3.1-8B-Instruct-q4f32_1-MLC";
                    model_llama_3_2_instruct = "Llama-3.2-3B-Instruct-q4f32_1-MLC";
                    model_hermes_3_llama = "Hermes-3-Llama-3.1-8B-q4f32_1-MLC";
                    model_mistral_7_instruct = "Mistral-7B-Instruct-v0.3-q4f32_1-MLC";
                    model_gemma_2 = "gemma-2-9b-it-q4f32_1-MLC";
                    model_qwen = "Qwen2.5-7B-Instruct-q4f32_1-MLC";
                    model_zephyr = "stablelm-2-zephyr-1_6b-q4f32_1-MLC";
                    model_redpajama_incite = "RedPajama-INCITE-Chat-3B-v1-q4f32_1-MLC";
                    appConfig = {
                        model_list: [
                            {
                                model: "https://huggingface.co/mlc-ai/RedPajama-INCITE-Chat-3B-v1-q4f32_1-MLC", // a base model
                                model_id: model_redpajama_incite,
                                model_lib: webllm.modelLibURLPrefix +
                                    webllm.modelVersion +
                                    "/RedPajama-INCITE-Chat-3B-v1-q4f32_1-ctx2k_cs1k-webgpu.wasm",
                                overrides: {
                                    context_window_size: 2048,
                                },
                            },
                            {
                                model: "https://huggingface.co/mlc-ai/stablelm-2-zephyr-1_6b-q4f32_1-MLC", // a base model
                                model_id: model_zephyr,
                                model_lib: webllm.modelLibURLPrefix +
                                    webllm.modelVersion +
                                    "/stablelm-2-zephyr-1_6b-q4f32_1-ctx4k_cs1k-webgpu.wasm",
                                overrides: {
                                    context_window_size: 4096,
                                },
                            },
                            {
                                model: "https://huggingface.co/mlc-ai/Qwen2.5-7B-Instruct-q4f32_1-MLC", // a base model
                                model_id: model_qwen,
                                model_lib: webllm.modelLibURLPrefix +
                                    webllm.modelVersion +
                                    "/Qwen2-7B-Instruct-q4f32_1-ctx4k_cs1k-webgpu.wasm",
                                overrides: {
                                    context_window_size: 4096,
                                },
                            },
                            {
                                model: "https://huggingface.co/mlc-ai/gemma-2-9b-it-q4f32_1-MLC", // a base model
                                model_id: model_gemma_2,
                                model_lib: webllm.modelLibURLPrefix +
                                    webllm.modelVersion +
                                    "/gemma-2-9b-it-q4f32_1-ctx4k_cs1k-webgpu.wasm",
                                overrides: {
                                    context_window_size: 4096,
                                },
                            },
                            {
                                model: "https://huggingface.co/mlc-ai/Mistral-7B-Instruct-v0.3-q4f32_1-MLC", // a base model
                                model_id: model_mistral_7_instruct,
                                model_lib: webllm.modelLibURLPrefix +
                                    webllm.modelVersion +
                                    "/Mistral-7B-Instruct-v0.3-q4f32_1-ctx4k_cs1k-webgpu.wasm",
                                overrides: {
                                    context_window_size: 4096,
                                },
                            },
                            {
                                model: "https://huggingface.co/mlc-ai/Hermes-2-Pro-Llama-3-8B-q4f32_1-MLC", // a base model
                                model_id: model_hermes_3_llama,
                                model_lib: webllm.modelLibURLPrefix +
                                    webllm.modelVersion +
                                    "/Llama-3-8B-Instruct-q4f32_1-ctx4k_cs1k-webgpu.wasm",
                                overrides: {
                                    context_window_size: 4096,
                                },
                            },
                            {
                                model: "https://huggingface.co/mlc-ai/Llama-3.2-3B-Instruct-q4f32_1-MLC", // a base model
                                model_id: model_llama_3_2_instruct,
                                model_lib: webllm.modelLibURLPrefix +
                                    webllm.modelVersion +
                                    "/Llama-3.2-3B-Instruct-q4f32_1-ctx4k_cs1k-webgpu.wasm",
                                overrides: {
                                    context_window_size: 4096,
                                },
                            },
                            {
                                model: "https://huggingface.co/mlc-ai/Llama-3.1-8B-Instruct-q4f32_1-MLC", // a base model
                                model_id: model_llama_3_1_instruct,
                                model_lib: webllm.modelLibURLPrefix +
                                    webllm.modelVersion +
                                    "/Llama-3_1-8B-Instruct-q4f32_1-ctx4k_cs1k-webgpu.wasm",
                                overrides: {
                                    context_window_size: 4096,
                                },
                            },
                            {
                                model: "https://huggingface.co/mlc-ai/Llama-3.1-8B-q4f32_1-MLC", // a base model
                                model_id: model_llama_3_1,
                                model_lib: webllm.modelLibURLPrefix +
                                    webllm.modelVersion +
                                    "/Llama-3_1-8B-Instruct-q4f32_1-ctx4k_cs1k-webgpu.wasm",
                                overrides: {
                                    context_window_size: 2048,
                                },
                            },
                        ],
                    };
                    return [4 /*yield*/, webllm.CreateMLCEngine(model_zephyr, {
                            appConfig: appConfig,
                            initProgressCallback: initProgressCallback,
                            logLevel: "INFO",
                        })];
                case 1:
                    engine_zephyr = _a.sent();
                    return [4 /*yield*/, webllm.CreateMLCEngine(model_qwen, {
                            appConfig: appConfig,
                            initProgressCallback: initProgressCallback,
                            logLevel: "INFO",
                        })];
                case 2:
                    engine_qwen = _a.sent();
                    return [4 /*yield*/, webllm.CreateMLCEngine(model_hermes_3_llama, {
                            appConfig: appConfig,
                            initProgressCallback: initProgressCallback,
                            logLevel: "INFO",
                        })];
                case 3:
                    engine_hermes_3_llama = _a.sent();
                    return [4 /*yield*/, webllm.CreateMLCEngine(model_llama_3_2_instruct, {
                            appConfig: appConfig,
                            initProgressCallback: initProgressCallback,
                            logLevel: "INFO",
                        })];
                case 4:
                    engine_llama_3_2_instruct = _a.sent();
                    return [4 /*yield*/, webllm.CreateMLCEngine(model_llama_3_1_instruct, {
                            appConfig: appConfig,
                            initProgressCallback: initProgressCallback,
                            logLevel: "INFO",
                        })];
                case 5:
                    engine_llama_3_1_instruct = _a.sent();
                    return [4 /*yield*/, webllm.CreateMLCEngine(model_llama_3_1, {
                            appConfig: appConfig,
                            initProgressCallback: initProgressCallback,
                            logLevel: "INFO",
                        })];
                case 6:
                    engine_llama_3_1 = _a.sent();
                    maxWordsSlider = document.getElementById('max_words');
                    maxWords = 5;
                    if (maxWordsSlider) {
                        maxWordsSlider.addEventListener('input', function () {
                            maxWords = parseInt(this.value, 10);
                            var labelMaxWords = document.getElementById('label_max_words');
                            if (labelMaxWords) {
                                labelMaxWords.innerText = "Top k words: ".concat(maxWords);
                            }
                        });
                    }
                    else {
                        console.error("Cannot find slider with id 'max_words'");
                    }
                    maxOutput = 1;
                    inputText = document.getElementById('input_text');
                    if (inputText) {
                        inputText.addEventListener('input', function () {
                            var inputText = this.value;
                            // Update the output based on the input text
                            // Check if the last character typed is a space
                            if (inputText.endsWith('  ')) {
                                // Call generate_llama if the last character is a space
                                generate_options(inputText, engine_llama_3_1, 'text_llama_31', maxWords, maxOutput);
                                generate_options(inputText, engine_llama_3_1_instruct, 'text_llama_31_instruct', maxWords, maxOutput);
                                generate_options(inputText, engine_llama_3_2_instruct, 'text_llama_32_instruct', maxWords, maxOutput);
                                generate_options(inputText, engine_hermes_3_llama, 'text_hermes_3_llama', maxWords, maxOutput);
                                //generate_options(inputText, engine_mistral_7_instruct, 'text_mistral_instruct', maxWords, maxOutput);
                                //generate_options(inputText, engine_gemma_2, 'text_gemma_2', maxWords, maxOutput);
                                generate_options(inputText, engine_qwen, 'text_qwen', maxWords, maxOutput);
                                generate_options(inputText, engine_zephyr, 'text_zephyr', maxWords, maxOutput);
                                //generate_options(inputText, engine_redpajama_incite, 'text_redpajama_incite', maxWords, maxOutput);
                            }
                        });
                    }
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
main();
