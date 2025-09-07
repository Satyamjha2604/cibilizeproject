// utils/pdfParser.js

/**
 * Converts a date string like "4 February" into a MySQL-compatible format like "YYYY-MM-DD".
 * @param {string} dateStr The date string from the PDF.
 * @returns {string} The formatted date string.
 */
function formatDateForMySQL(dateStr) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const [day, monthName] = dateStr.split(" ");

  const monthMap = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };

  const month = monthMap[monthName];
  const paddedDay = day.padStart(2, "0");

  return `${currentYear}-${month}-${paddedDay}`;
}

/**
 * Parses raw text from a bank statement to extract expense transactions.
 * @param {string} text The raw text content of the bank statement.
 * @returns {Array<Object>} An array of objects, where each object represents an expense.
 */
function parseBankStatement(text) {
  const expenses = [];
  const lines = text.split("\n");

  const dateRegex = /^(\d{1,2}\s+[A-Z][a-z]+)/;
  const amountRegex = /([\d,]+\.\d{2})/;

  let lastDate = null;
  let descriptionBuffer = [];
  let processingTransaction = false;

  for (const line of lines) {
    const trimmedLine = line.trim();

    const dateMatch = trimmedLine.match(dateRegex);
    if (dateMatch) {
      if (processingTransaction) {
        const lastLine = descriptionBuffer[descriptionBuffer.length - 1] || "";
        const amountMatch = lastLine.match(amountRegex);

        if (amountMatch) {
          const amount = parseFloat(amountMatch[1].replace(/,/g, ""));

          if (
            amount > 0 &&
            !descriptionBuffer.some(
              (d) =>
                d.includes("BiWeekly Payment") || d.includes("Direct Deposit")
            )
          ) {
            expenses.push({
              date: formatDateForMySQL(lastDate),
              description: descriptionBuffer
                .slice(0, descriptionBuffer.length - 1)
                .join(" ")
                .trim(),
              amount,
            });
          }
        }
      }

      lastDate = dateMatch[1];
      descriptionBuffer = [trimmedLine.substring(dateMatch[1].length).trim()];
      processingTransaction = true;
      continue;
    }

    if (processingTransaction) {
      descriptionBuffer.push(trimmedLine);
    }
  }

  if (processingTransaction) {
    const lastLine = descriptionBuffer[descriptionBuffer.length - 1] || "";
    const amountMatch = lastLine.match(amountRegex);

    if (amountMatch) {
      const amount = parseFloat(amountMatch[1].replace(/,/g, ""));
      if (
        amount > 0 &&
        !descriptionBuffer.some(
          (d) => d.includes("BiWeekly Payment") || d.includes("Direct Deposit")
        )
      ) {
        expenses.push({
          date: formatDateForMySQL(lastDate),
          description: descriptionBuffer
            .slice(0, descriptionBuffer.length - 1)
            .join(" ")
            .trim(),
          amount,
        });
      }
    }
  }

  return expenses.map((e) => ({
    ...e,
    description: e.description
      .replace(/High Street, timed.*/, "")
      .replace(/Randomford's Deli.*/, "Randomford's Deli")
      .replace(/Anytown's Jewelers.*/, "Anytown's Jewelers")
      .replace(/Monthly Apartment Rent.*/, "Monthly Apartment Rent")
      .replace("Card payment", "")
      .replace("Direct debit", "")
      .replace("Cash Withdrawal", "")
      .trim(),
  }));
}

module.exports = { parseBankStatement };
