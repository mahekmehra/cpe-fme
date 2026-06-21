import { useState } from "react";

export default function IncidentForm({
  onSubmit,
  loading
}) {

  const [formData, setFormData] = useState({

    latitude: "12.9716",
    longitude: "77.5946",

    created_datetime:
      "2026-06-21 18:30:00",

    location:
      "MG Road Metro Station",

    vehicle_type:
      "CAR",

    violation_type:
      "NO PARKING",

    police_station:
      "Upparpet",

    junction_name:
      "No Junction"
  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value
    });
  };

  return (

    <div className="bg-slate-800 rounded-xl p-6">

      <h2 className="text-2xl font-bold mb-4">
        Incident Input
      </h2>

      <div className="grid grid-cols-2 gap-4">

        {Object.keys(formData).map((field) => (

          <input
            key={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field}
            className="
              bg-slate-700
              p-3
              rounded
            "
          />
        ))}

      </div>

      <button

        onClick={() =>
          onSubmit(formData)
        }

        disabled={loading}

        className="
          mt-6
          bg-blue-600
          px-6
          py-3
          rounded-lg
          hover:bg-blue-500
        "
      >
        {loading
          ? "Analyzing..."
          : "Analyze Incident"}
      </button>

    </div>
  );
}