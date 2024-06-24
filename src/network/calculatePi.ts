export interface calculatePiBodyProps {
  iteration?: number;
  bigNumber?: number;
}

export interface calculatePiProps {
  method: piMethods;
  bodyData: calculatePiBodyProps;
}

export const calculatePi = async ({ method, bodyData }: calculatePiProps) => {
  try {
    const response = await fetch(`http://localhost:8080/pi/v1/calculatePi?method=${method}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log(">>>> error", JSON.stringify(error));
    return {
      data: null,
      error: "Error calculating PI Values",
    };
  }
};
