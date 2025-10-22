export const askScamExpert = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch('/api/ask-expert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'An unknown error occurred.');
    }

    return data.text;
  } catch (error) {
    console.error('Error fetching from local API:', error);
    if (error instanceof Error) {
        throw new Error(`Failed to get a response from the expert: ${error.message}`);
    }
    throw new Error('Failed to get a response from the expert. Please check your connection.');
  }
};
