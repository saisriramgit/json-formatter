// json-formatter-mfe/src/main.ts
document.addEventListener("DOMContentLoaded", () => {
  const jsonInput = document.getElementById(
    "jsonInput"
  ) as HTMLTextAreaElement | null;
  const jsonOutput = document.getElementById(
    "jsonOutput"
  ) as HTMLTextAreaElement | null;
  const formatJsonBtn = document.getElementById("formatJsonBtn");
  const clearJsonBtn = document.getElementById("clearJsonBtn");
  const copyJsonOutputBtn = document.getElementById(
    "copyJsonOutputBtn"
  ) as HTMLButtonElement | null;
  const validationStatus = document.getElementById("validationStatus");

  if (
    !jsonInput ||
    !jsonOutput ||
    !formatJsonBtn ||
    !clearJsonBtn ||
    !copyJsonOutputBtn ||
    !validationStatus
  ) {
    console.error("One or more elements not found for JSON Formatter tool");
    return;
  }

  const updateValidationStatus = (message: string, isError: boolean) => {
    validationStatus.textContent = message;
    validationStatus.className = `mt-1 text-xs h-4 ${
      isError ? "text-red-400" : "text-green-400"
    }`;
  };

  formatJsonBtn.addEventListener("click", () => {
    const rawJson = jsonInput.value.trim();
    if (!rawJson) {
      jsonOutput.value = "";
      updateValidationStatus("Input is empty.", false);
      return;
    }

    try {
      const parsedJson = JSON.parse(rawJson);
      jsonOutput.value = JSON.stringify(parsedJson, null, 2);
      updateValidationStatus("JSON is valid.", false);
    } catch (e: any) {
      jsonOutput.value = ""; // Clear output on error
      let errorMessage = "Invalid JSON: ";
      if (e instanceof SyntaxError) {
        errorMessage += e.message;
      } else {
        errorMessage += "Unknown error occurred.";
      }
      updateValidationStatus(errorMessage, true);
      console.error("JSON parsing error: ", e);
    }
  });

  clearJsonBtn.addEventListener("click", () => {
    jsonInput.value = "";
    jsonOutput.value = "";
    updateValidationStatus("", false);
  });

  copyJsonOutputBtn.addEventListener("click", () => {
    if (jsonOutput.value && jsonOutput.value !== "Invalid JSON input") {
      navigator.clipboard
        .writeText(jsonOutput.value)
        .then(() => {
          copyJsonOutputBtn.textContent = "Copied!";
          setTimeout(() => {
            copyJsonOutputBtn.textContent = "Copy Output";
          }, 1500);
        })
        .catch((err) => {
          console.error("Failed to copy JSON: ", err);
          alert("Failed to copy JSON");
        });
    }
  });
});
