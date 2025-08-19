import React, { useState } from "react";

const ContributorForm = () => {
  // Form state to include contributors
  const [formData, setFormData] = useState({
    contributors: [
      { contributorType: "", name: "", expense: "", trackRecord: "" },
    ],
  });

  // Function to handle adding a new contributor
  const addContributor = () => {
    setFormData((prev) => ({
      ...prev,
      contributors: [
        ...prev.contributors,
        { contributorType: "", name: "", expense: "", trackRecord: "" },
      ],
    }));
  };

  // Function to handle removing a contributor
  const removeContributor = (index:any) => {
    setFormData((prev) => ({
      ...prev,
      contributors: prev.contributors.filter((_, idx) => idx !== index),
    }));
  };

  // Function to handle updating a specific contributor's field
  const updateContributor = (index:any, field:any, value:any) => {
    const updatedContributors = formData.contributors.map((contributor, idx) =>
      idx === index ? { ...contributor, [field]: value } : contributor
    );
    setFormData((prev) => ({
      ...prev,
      contributors: updatedContributors,
    }));
  };

  // Function to get placeholder text based on contributorType
  const getPlaceholder = (type:any) => {
    switch (type) {
      case "Producer":
        return "Enter Producer Name";
      case "Director":
        return "Enter Director Name";
      case "Star Cast":
        return "Enter Star Cast Name";
      case "Production Crew":
        return "Enter Crew Member Name";
      default:
        return "Enter Name";
    }
  };

  // Function to handle form submission
  const handleSubmit = (e:any) => {
    e.preventDefault();

    // Example: fetch('/api/submit', { method: 'POST', body: JSON.stringify(formData) })
  };

  return (
    <form onSubmit={handleSubmit}>
      {formData.contributors.map((contributor, index) => (
        <div key={index} className="flex gap-4 mb-4">
          {/* Select Tag for Contributor Type */}
          <select
            value={contributor.contributorType}
            onChange={(e) =>
              updateContributor(index, "contributorType", e.target.value)
            }
            className="border rounded px-2 py-1"
          >
            <option value="">Select Contributor</option>
            <option value="Producer">Producer</option>
            <option value="Director">Director</option>
            <option value="Star Cast">Star Cast</option>
            <option value="Production Crew">Key Production Crew</option>
          </select>

          {/* Input for Name with Dynamic Placeholder */}
          <input
            type="text"
            value={contributor.name}
            onChange={(e) => updateContributor(index, "name", e.target.value)}
            placeholder={getPlaceholder(contributor.contributorType)}
            className="border rounded px-2 py-1"
          />

          {/* Input for Expense */}
          <input
            type="number"
            value={contributor.expense}
            onChange={(e) => updateContributor(index, "expense", e.target.value)}
            placeholder="Enter Expense"
            className="border rounded px-2 py-1"
          />

          {/* Input for Track Record */}
          <input
            type="text"
            value={contributor.trackRecord}
            onChange={(e) =>
              updateContributor(index, "trackRecord", e.target.value)
            }
            placeholder="Enter Track Record"
            className="border rounded px-2 py-1"
          />

          {/* Remove Contributor Button */}
          <button
            type="button"
            className="text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded"
            onClick={() => removeContributor(index)}
          >
            Remove
          </button>
        </div>
      ))}

      {/* Add Contributor Button */}
      <div className="ml-2 flex mb-4">
        <span
          className="inline-flex items-center justify-center px-4 py-2 text-white font-medium text-sm bg-emerald-500 rounded-md shadow-md hover:bg-emerald-600 focus:ring-2 focus:ring-offset-2 cursor-pointer transition duration-200 ease-in-out"
          onClick={addContributor}
        >
          + Add Contributor
        </span>
      </div>

      {/* Submit Button */}
   
    </form>
  );
};

export default ContributorForm;
