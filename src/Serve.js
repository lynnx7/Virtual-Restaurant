import { useEffect,useState } from "react";
import OpenAI from "openai";

function Serve({order}) {
  
  let my_prompt = ""
  let single = true
  for (const item of order) {

      if (!single){
        my_prompt+= " and "
      }
      my_prompt+= item.qty;
      my_prompt+= "* "
      my_prompt+= item.name;
      single = false
        
    }
  my_prompt+=" Editorial Photography, Photography, Shot on 70mm lens, Depth of Field, Bokeh, DOF, Tilt Blur, Shutter Speed 1/1000, F/22, White Balance, 32k, Super-Resolution, white background"
  console.log(my_prompt)

  const [prompt, setPrompt] = useState(my_prompt);
  const [result, setResult] = useState("");
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_KEY,
    dangerouslyAllowBrowser: true // This is the default and can be omitted
  });
  
  const generateImage = async () => {
    
    const res = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: "256x256",
    });

    setResult(res.data[0].url);
  };
  useEffect(() => {generateImage()}, []);
  
  return (
    <div className="app-main">
      <>
        {/* <h2>Generate an Image using Open AI API</h2>

        <textarea
          className="app-input"
          placeholder="Search Bears with Paint Brushes the Starry Night, painted by Vincent Van Gogh.."
          onChange={(e) => setPrompt(e.target.value)}
          rows="10"
          cols="40"
        /> */}
        {/* <button onClick={generateImage}>Generate an Image</button> */}
        {result.length > 0 ? (
          <>
          <p>Enjoy Your Meal!</p>
          <img className="result-image" src={result} alt="result" />
          </>
        ) : (
          <>Your Food is On the Way!</>
        )}
      </>
    </div>
  );
}

export default Serve;