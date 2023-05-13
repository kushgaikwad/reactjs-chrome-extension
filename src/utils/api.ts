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

    const result = await response.json();
    // console.log("result: " + result.summary);
    // console.log(result.tags);
    return result;
  } catch (error) {
    console.error(error);
  }
}
