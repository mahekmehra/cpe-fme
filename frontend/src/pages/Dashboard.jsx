import { useState } from "react";

import StatsCard from
  "../components/StatsCard";

import IncidentForm from
  "../components/IncidentForm";

import PredictionCard from
  "../components/PredictionCard";

import DispatchPanel from
  "../components/DispatchPanel";

import API from
  "../services/api";

export default function Dashboard() {

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const submitIncident =
    async (payload) => {

      try {

        setLoading(true);

        const response =
          await API.post(
            "/predict",
            payload
          );

        setResult(
          response.data
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="
      min-h-screen
      bg-slate-950
      text-white
      p-8
    ">

      <h1 className="
        text-5xl
        font-bold
      ">
        AI Traffic Intelligence Dashboard
      </h1>

      <p className="
        text-slate-400
        mt-2
      ">
        Smart City Operations Center
      </p>

      <div className="
        grid
        grid-cols-3
        gap-6
        mt-10
      ">

        <StatsCard
          title="Backend"
          value="ONLINE"
        />

        <StatsCard
          title="Model"
          value="v2"
        />

        <StatsCard
          title="Gemini"
          value="ONLINE"
        />

      </div>

      <div className="
        grid
        grid-cols-2
        gap-6
        mt-10
      ">

        <IncidentForm
          onSubmit={
            submitIncident
          }
          loading={loading}
        />

        <PredictionCard
          result={result}
        />

      </div>

      <div className="mt-6">

        <DispatchPanel
          dispatch={
            result?.dispatch
          }
        />

      </div>

    </div>
  );
}