export async function getSummaryAndTagsFromAI(
  selectedText: string
): Promise<any> {
  const data = { selectedText };
  

  try {
    const response = await fetch("http://localhost:3000/chat-gpt-ai/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    
    if (!response.ok) {
      throw new Error("Error calling AI..");
    }
    const result = await response.json();
    
    
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchAllNotes(): Promise<any> {
  try {
    const res = await fetch("http://localhost:3000/notes");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const sortNotes = (sortBy: string, notes) => {
 
  if (sortBy === "Oldest") {
    const sortedNotes = notes.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  
    return sortedNotes;
  } else {
    const sortedNotes = notes.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
   
    return sortedNotes;
  }
};
