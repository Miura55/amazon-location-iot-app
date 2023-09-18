import { useState, useEffect, useRef } from "react";
import { Geo } from "@aws-amplify/geo";
import { Auth } from "@aws-amplify/auth";
import {
  LocationClient,
  GetDevicePositionHistoryCommand,
} from "@aws-sdk/client-location";

const useTracker = (requestParams) => {
  const locationClient = useRef();
  const [trackerPositions, setTrackerPositions] = useState([]);

  useEffect(() => {
    const getTracerLocations = async () => {
      // If StartTimeInclusive or EndTimeExclusive are not null, set them(Luxon object) to Date objects
      if (requestParams.StartTimeInclusive) {
        requestParams.StartTimeInclusive = requestParams.StartTimeInclusive.toJSDate();
      }
      if (requestParams.EndTimeExclusive) {
        requestParams.EndTimeExclusive = requestParams.EndTimeExclusive.toJSDate();
      }
      
      // If the transformer is ready, create a new LocationClient instance if one doesn't exist
      if (!locationClient.current) {
        const credentials = await Auth.currentCredentials();

        // create a new LocationClient instance and save it in a ref
        // so it persists re-renders and takes care of renewing the AWS credentials
        locationClient.current = new LocationClient({
          region: Geo.getDefaultMap().region,
          credentials,
        });
      }
      // If the trackerPositions state is empty, fetch the device position history
      try {
        const res = await locationClient.current.send(
          new GetDevicePositionHistoryCommand(requestParams)
        );
        if (res.DevicePositions.length === 0) {
          throw new Error("No device position history found");
        }
        setTrackerPositions(res.DevicePositions);
        // if (res.NextToken) {
        //   requestParams.NextToken = res.NextToken;
        //   const nextRes = await locationClient.current.send(
        //     new GetDevicePositionHistoryCommand(requestParams)
        //   );
        //   setTrackerPositions((prevState) => [
        //     ...prevState,
        //     ...nextRes.DevicePositions,
        //   ]);
        // }
      } catch (error) {
        console.error("Unable to get tracker positions", error);
        throw error;
      }
    };

    getTracerLocations();
  }, []);

  return trackerPositions;
};

export default useTracker;
