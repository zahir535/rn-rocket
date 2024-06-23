export const getPiData = async () => {
  try {
    const response = await fetch("http://localhost:8080/pi/v1/getPi", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log(">>>> error", JSON.stringify(error));
    return {
      data: null,
      error: "Error get PI Values",
    };
  }
};
