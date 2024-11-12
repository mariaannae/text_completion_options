//import { max } from "@huggingface/transformers";
import * as webllm from "@mlc-ai/web-llm";



function setLabel(id: string, text: string) {
  const label = document.getElementById(id);
  if (label == null) {
    throw Error("Cannot find label " + id);
  }
  label.innerText = text;
}

async function main() {
  const initProgressCallback = (report: webllm.InitProgressReport) => {
    setLabel("init-label", report.text);
  };

  // Unlike "Llama-3.1-8B-Instruct-q4f32_1-MLC", this is a base model
  const model_llama_3_1 = "Llama-3.1-8B-q4f32_1-MLC";
  const model_llama_3_1_instruct = "Llama-3.1-8B-Instruct-q4f32_1-MLC";
  const model_llama_3_2_instruct = "Llama-3.2-3B-Instruct-q4f32_1-MLC";
  const model_hermes_3_llama = "Hermes-3-Llama-3.1-8B-q4f32_1-MLC";
  const model_mistral_7_instruct = "Mistral-7B-Instruct-v0.3-q4f32_1-MLC";
  const model_gemma_2= "gemma-2-9b-it-q4f32_1-MLC";
  const model_qwen = "Qwen2.5-7B-Instruct-q4f32_1-MLC";
  const model_zephyr = "stablelm-2-zephyr-1_6b-q4f32_1-MLC";
  const model_redpajama_incite = "RedPajama-INCITE-Chat-3B-v1-q4f32_1-MLC";

  const appConfig: webllm.AppConfig = {
    model_list: [
      {
        model: "https://huggingface.co/mlc-ai/RedPajama-INCITE-Chat-3B-v1-q4f32_1-MLC", // a base model
        model_id: model_redpajama_incite,
        model_lib:
          webllm.modelLibURLPrefix +
          webllm.modelVersion +
          "/RedPajama-INCITE-Chat-3B-v1-q4f32_1-ctx2k_cs1k-webgpu.wasm",
        overrides: {
          context_window_size: 2048,
        },
      },
      {
        model: "https://huggingface.co/mlc-ai/stablelm-2-zephyr-1_6b-q4f32_1-MLC", // a base model
        model_id: model_zephyr,
        model_lib:
          webllm.modelLibURLPrefix +
          webllm.modelVersion +
          "/stablelm-2-zephyr-1_6b-q4f32_1-ctx4k_cs1k-webgpu.wasm",
        overrides: {
          context_window_size: 4096,
        },
      },
      {
        model: "https://huggingface.co/mlc-ai/Qwen2.5-7B-Instruct-q4f32_1-MLC", // a base model
        model_id: model_qwen,
        model_lib:
          webllm.modelLibURLPrefix +
          webllm.modelVersion +
          "/Qwen2-7B-Instruct-q4f32_1-ctx4k_cs1k-webgpu.wasm",
        overrides: {
          context_window_size: 4096,
        },
      },
      {
        model: "https://huggingface.co/mlc-ai/gemma-2-9b-it-q4f32_1-MLC", // a base model
        model_id: model_gemma_2,
        model_lib:
          webllm.modelLibURLPrefix +
          webllm.modelVersion +
          "/gemma-2-9b-it-q4f32_1-ctx4k_cs1k-webgpu.wasm",
        overrides: {
          context_window_size: 4096,
        },
      },
      {
        model: "https://huggingface.co/mlc-ai/Mistral-7B-Instruct-v0.3-q4f32_1-MLC", // a base model
        model_id: model_mistral_7_instruct,
        model_lib:
          webllm.modelLibURLPrefix +
          webllm.modelVersion +
          "/Mistral-7B-Instruct-v0.3-q4f32_1-ctx4k_cs1k-webgpu.wasm",
        overrides: {
          context_window_size: 4096,
        },
      },
      {
        model: "https://huggingface.co/mlc-ai/Hermes-2-Pro-Llama-3-8B-q4f32_1-MLC", // a base model
        model_id: model_hermes_3_llama,
        model_lib:
          webllm.modelLibURLPrefix +
          webllm.modelVersion +
          "/Llama-3-8B-Instruct-q4f32_1-ctx4k_cs1k-webgpu.wasm",
        overrides: {
          context_window_size: 4096,
        },
      },
      {
        model: "https://huggingface.co/mlc-ai/Llama-3.2-3B-Instruct-q4f32_1-MLC", // a base model
        model_id: model_llama_3_2_instruct,
        model_lib:
          webllm.modelLibURLPrefix +
          webllm.modelVersion +
          "/Llama-3.2-3B-Instruct-q4f32_1-ctx4k_cs1k-webgpu.wasm",
        overrides: {
          context_window_size: 4096,
        },
      },
      {
        model: "https://huggingface.co/mlc-ai/Llama-3.1-8B-Instruct-q4f32_1-MLC", // a base model
        model_id: model_llama_3_1_instruct,
        model_lib:
          webllm.modelLibURLPrefix +
          webllm.modelVersion +
          "/Llama-3_1-8B-Instruct-q4f32_1-ctx4k_cs1k-webgpu.wasm",
        overrides: {
          context_window_size: 4096,
        },
      },
      {
        model: "https://huggingface.co/mlc-ai/Llama-3.1-8B-q4f32_1-MLC", // a base model
        model_id: model_llama_3_1,
        model_lib:
          webllm.modelLibURLPrefix +
          webllm.modelVersion +
          "/Llama-3_1-8B-Instruct-q4f32_1-ctx4k_cs1k-webgpu.wasm",
        overrides: {
          context_window_size: 2048,
        },
      },
    ],
  };

  
  //const engine_redpajama_incite: webllm.MLCEngineInterface = await webllm.CreateMLCEngine(
  //  model_redpajama_incite,
  //  {
  //    appConfig: appConfig,
  //    initProgressCallback: initProgressCallback,
  //    logLevel: "INFO",
  //  },
  //);


  const engine_zephyr: webllm.MLCEngineInterface = await webllm.CreateMLCEngine(
    model_zephyr,
    {
      appConfig: appConfig,
      initProgressCallback: initProgressCallback,
      logLevel: "INFO",
    },
  );

  const engine_qwen: webllm.MLCEngineInterface = await webllm.CreateMLCEngine(
    model_qwen,
    {
      appConfig: appConfig,
      initProgressCallback: initProgressCallback,
      logLevel: "INFO",
    },
  );

  //const engine_gemma_2: webllm.MLCEngineInterface = await webllm.CreateMLCEngine(
  //  model_gemma_2,
  //  {
  //    appConfig: appConfig,
  //    initProgressCallback: initProgressCallback,
  //    logLevel: "INFO",
  //  },
  //);

  //const engine_mistral_7_instruct: webllm.MLCEngineInterface = await webllm.CreateMLCEngine(
  //  model_mistral_7_instruct,
  //  {
  //    appConfig: appConfig,
  //    initProgressCallback: initProgressCallback,
  //    logLevel: "INFO",
  //  },
  //);
  
  const engine_hermes_3_llama: webllm.MLCEngineInterface = await webllm.CreateMLCEngine(
    model_hermes_3_llama,
    {
      appConfig: appConfig,
      initProgressCallback: initProgressCallback,
      logLevel: "INFO",
    },
  );
   
  const engine_llama_3_2_instruct: webllm.MLCEngineInterface = await webllm.CreateMLCEngine(
    model_llama_3_2_instruct,
    {
      appConfig: appConfig,
      initProgressCallback: initProgressCallback,
      logLevel: "INFO",
    },
  );
 
  const engine_llama_3_1_instruct: webllm.MLCEngineInterface = await webllm.CreateMLCEngine(
    model_llama_3_1_instruct,
    {
      appConfig: appConfig,
      initProgressCallback: initProgressCallback,
      logLevel: "INFO",
    },
  );

  const engine_llama_3_1: webllm.MLCEngineInterface = await webllm.CreateMLCEngine(
    model_llama_3_1,
    {
      appConfig: appConfig,
      initProgressCallback: initProgressCallback,
      logLevel: "INFO",
    },
  );

  

  async function generate_options(text: string, inference_engine: webllm.MLCEngineInterface, element_id: string, topk: number, max_output: number) {

    const textElement = document.getElementById(element_id) as HTMLTextAreaElement;
    if (textElement) {
      textElement.value = "Loading...";
    } else {
      console.error("Cannot find textarea with id " + element_id);
    }


    const reply = await inference_engine.completions.create({
      prompt: "text: " + text,
      // below configurations are all optional
      echo: false,
      n: 1,
      max_tokens: max_output,
      logprobs: true,
      top_logprobs: topk,
      //best_of: 5, // option not yet supported
    });

    // Iterate through the choices array and concatenate the text items
    let combinedText = "";
    if (reply.choices && reply.choices[0].logprobs && reply.choices[0].logprobs.content && reply.choices[0].logprobs.content[0].top_logprobs) {
      reply.choices[0].logprobs.content[0].top_logprobs.forEach(choice => {
        combinedText += choice.token.trim() + "\n";
      });
    } else {
      console.error("Unexpected reply structure", reply);
    }

    textElement.value = combinedText;

    console.log(reply);
  }

  //handle top-k scrollbar
  const maxWordsSlider = document.getElementById('max_words') as HTMLInputElement;
  let maxWords = 5;

  if (maxWordsSlider) {
    maxWordsSlider.addEventListener('input', function() {
      maxWords = parseInt(this.value, 10);
      const labelMaxWords = document.getElementById('label_max_words');
      if (labelMaxWords) {
        labelMaxWords.innerText = `Top k words: ${maxWords}`;
      }
    });
  } else {
    console.error("Cannot find slider with id 'max_words'");
  }

    //handle output tokens scrollbar
  //const maxOutputSlider = document.getElementById('output_tokens') as HTMLInputElement;
  let maxOutput = 1;

  // if (maxOutputSlider) {
  //   maxOutputSlider.addEventListener('input', function() {
  //     maxOutput = parseInt(this.value, 10);
  //     const labelMaxOutput = document.getElementById('label_output_tokens');
  //     if (labelMaxOutput) {
  //       labelMaxOutput.innerText = `Max output tokens: ${maxOutput}`;
  //     }
  //   });
  // } else {
  //   console.error("Cannot find slider with id ''output_tokens''");
  // }


  const inputText = document.getElementById('input_text') as HTMLTextAreaElement;
  if (inputText) {
    inputText.addEventListener('input', function() {
    const inputText = this.value;
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
    })};
}





main();
