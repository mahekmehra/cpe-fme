import { useState, useEffect } from "react";


export default function IncidentForm({
  onSubmit,
  loading,
  stations,
  junctions
}) {

  const [formData, setFormData] =
    useState({

      latitude: "12.9716",

      longitude: "77.5946",

      location:
        "MG Road Metro Station",

      vehicle_type:
        "CAR",

      violation_type:
        "NO PARKING",

      police_station:
        "",

      junction_name:
        ""
    });

    useEffect(() => {

        if (
        stations.length > 0
        ) {

            setFormData(
                previous => ({

                ...previous,

                police_station:
                    stations[0]
                })
            );
        }

    }, [stations]);

  // ADD SECOND useEffect HERE

    useEffect(() => {

        if (
        junctions.length > 0
        ) {

            setFormData(
                previous => ({

                ...previous,

                junction_name:
                    junctions[0]
                })
            );
        }

    }, [junctions]);

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value
      });
    };

  const submitData =
    () => {

      onSubmit({

        ...formData,

        created_datetime:

          new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " ")
      });
    };

  return (

    <div className="
      bg-slate-800
      rounded-xl
      p-6
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-4
      ">
        Incident Input
      </h2>

      <div className="
        grid
        grid-cols-2
        gap-4
      ">

        <input
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
          className="bg-slate-700 p-3 rounded"
        />

        <input
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
          className="bg-slate-700 p-3 rounded"
        />

        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="bg-slate-700 p-3 rounded"
        />

        <select
          name="vehicle_type"
          value={formData.vehicle_type}
          onChange={handleChange}
          className="bg-slate-700 p-3 rounded"
        >

          <option>CAR</option>
          <option>BUS</option>
          <option>TRUCK</option>
          <option>TWO WHEELER</option>

        </select>

        <select
          name="violation_type"
          value={formData.violation_type}
          onChange={handleChange}
          className="bg-slate-700 p-3 rounded"
        >

          <option>NO PARKING</option>
          <option>WRONG PARKING</option>
          <option>OBSTRUCTION</option>

        </select>

        <select

            name="police_station"

            value={
                formData.police_station
            }

            onChange={
                handleChange
            }

            className="
                bg-slate-700
                p-3
                rounded
            "
        >

            {
                stations.map(
                    station => (

                        <option
                        key={station}
                        value={station}
                        >
                        {station}
                        </option>
                    )
                )
            }

        </select>       

        <select

            name="junction_name"

            value={
                formData.junction_name
            }

            onChange={
                handleChange
            }

            className="
                bg-slate-700
                p-3
                rounded
            "
        >

            {
                junctions.map(
                    junction => (

                        <option
                        key={junction}
                        value={junction}
                        >
                        {junction}
                        </option>
                    )
                )
            }

        </select>

      </div>

      <button

        onClick={submitData}

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

        {
          loading
            ? "Generating AI Analysis..."
            : "Analyze Incident"
        }

      </button>

    </div>
  );
}