export async function getSummaryAndTagsFromAI(
  selectedText: string
): Promise<any> {
  const data = { selectedText };
  console.log(data);

  try {
    const response = await fetch("http://localhost:3000/chat-gpt-ai/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    // const result = await response.json();
    if(!response.ok){
      throw new Error('Error calling AI..')
    }
    const result = await response.json();
    console.log(result);
    // console.log(result.tags);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchAllNotes(): Promise<any> {

  try {
    const res = await fetch('http://localhost:3000/notes');
    const data = await res.json();
    return data;

  } catch (error) {
    console.error(error);
  }
  
 

  
  
}
