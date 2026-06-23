import { useState, useEffect } from "react";

import StatsCard from "../components/StatsCard";
import IncidentForm from "../components/IncidentForm";
import PredictionCard from "../components/PredictionCard";
import DispatchPanel from "../components/DispatchPanel";
import LocationMap from "../components/LocationMap";
import TrafficChart from "../components/TrafficChart";


import API from "../services/api";

import {
  getHealth,
  getVersion
} from "../services/systemService";

import { 
    getMetadata 
} from "../services/metadataService";

export default function Dashboard() {

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [health, setHealth] =
    useState(null);

  const [version, setVersion] =
    useState(null);

  const [stations, setStations] =
    useState([]);

  const [junctions, setJunctions] =
    useState([]);

  const [vehicleTypes, setVehicleTypes] =
    useState([]);

  const [violationTypes, setViolationTypes] =
    useState([]);

  const [history, setHistory] =
    useState([

        {
          time: "08:00",
          risk: 35
        },

        {
          time: "10:00",
          risk: 48
        },

        {
          time: "12:00",
          risk: 42
        },

        {
          time: "14:00",
          risk: 61
        },

        {
          time: "16:00",
          risk: 74
        }
    ]);

  const [coordinates, setCoordinates] =
    useState({

      latitude: 12.9716,

      longitude: 77.5946
    });

  useEffect(() => {

    const loadSystemInfo =
      async () => {

        try {

          const healthData =
            await getHealth();

          const versionData =
            await getVersion();

          setHealth(
            healthData
          );

          setVersion(
            versionData
          );

          const metadata =
            await getMetadata();

          setStations(
            metadata.stations
          );

          setJunctions(
            metadata.junctions
          );

          setVehicleTypes(
            metadata.vehicle_types || []
          );

          setViolationTypes(
            metadata.violation_types || []
          );

        } catch (error) {

          console.error(
            error
          );
        }
      };

    loadSystemInfo();

  }, []);

  const submitIncident =
    async (payload) => {

      try {

        setLoading(true);

        setCoordinates({

          latitude:
            Number(
              payload.latitude
            ),

          longitude:
            Number(
              payload.longitude
            )
        });

        const response =
          await API.post(
            "/predict",
            payload
          );

        setResult(
          response.data
        );

        setHistory(

            previous => [

                ...previous,

                {

                    time:

                    new Date()
                    .toLocaleTimeString(),

                    risk:

                        Number(

                            (
                            response.data
                            .probability * 100
                            ).toFixed(2)

                        )
                }
            ]
        );

      } catch (error) {

        console.error(
          error
        );

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

      {/* Header */}

      <div>

        <h1 className="
          text-5xl
          font-bold
        ">
          AI Traffic Intelligence Dashboard
        </h1>

        <p className="
          text-slate-400
          mt-3
        ">
          Smart City Traffic Operations Center
        </p>

      </div>

      {/* Status Cards */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
        mt-10
      ">

        <StatsCard
          title="Backend Status"
          value={
            health?.status === "healthy"

            ? "ONLINE"

            : "OFFLINE"
          }
        />

        <StatsCard
          title="Model Version"
          value={
            version?.model_version
              || "..."
          }
        />

        <StatsCard
          title="AI Engine"
          value={
            health?.model_loaded

            ? "READY"

            : "LOADING"
          }
        />

      </div>

      {/* Form + Prediction */}

      <div className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-6
        mt-10
      ">

        <IncidentForm
            onSubmit={
                submitIncident
            }

            loading={
                loading
            }

            stations={
                stations
            }

            junctions={
                junctions
            }

            vehicleTypes={
                vehicleTypes
            }

            violationTypes={
                violationTypes
            }
        />

        <PredictionCard
          result={result}
        />

      </div>

      {/* Map */}

      <div className="mt-6">

        <LocationMap

          latitude={
            coordinates.latitude
          }

          longitude={
            coordinates.longitude
          }

        />

      </div>

      {/* Chart */}

      <div className="mt-6">

        <TrafficChart
            history={history}
        />

      </div>

      {/* Dispatch */}

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