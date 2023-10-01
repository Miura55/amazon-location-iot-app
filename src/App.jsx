import { useState, useEffect, useRef } from "react";
import { MapView } from "@aws-amplify/ui-react-geo";
import { Geo } from "@aws-amplify/geo";
import { Auth } from "@aws-amplify/auth";
import {
  LocationClient,
  GetDevicePositionHistoryCommand,
} from "@aws-sdk/client-location";
import { NavigationControl } from "react-map-gl";
import Markers from "./components/Markers";
import LineOverlay from "./components/LineOverlay";
import ControlPanel from "./components/ControlPanel";

function App() {
  const locationClient = useRef();
  const [startDateTime, setStartDateTime] = useState(null); // [1]
  const [endDateTime, setEndDateTime] = useState(null); // [2]
  const [trackerPositions, setTrackerPositions] = useState([]); // [3]

  useEffect(() => {
    (async () => {
      const requestStartDateTime = startDateTime ? startDateTime.toJSDate() : null;
      const requestEndDateTime = endDateTime ? endDateTime.toJSDate() : null;
      
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
        const requestParams = {
          DeviceId: "core2",
          TrackerName: "trackerAsset01", // This is the Tracker name, change it according to your own setup
          EndTimeExclusive: requestEndDateTime,
          StartTimeInclusive: requestStartDateTime,
        };
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
        console.log(`Length of trackerPositions: ${trackerPositions.length}`)
      } catch (error) {
        console.error("Unable to get tracker positions", error);
        throw error;
      }
    })();
  }, [startDateTime, endDateTime]);

  return (
    <>
      <ControlPanel handleDateTimeChange={
        (startDateTime, endDateTime) => {
          setStartDateTime(startDateTime);
          setEndDateTime(endDateTime);
        }
      }/>
      <MapView
        initialViewState={{
          longitude: 137.1676,
          latitude: 34.9548,
          zoom: 14,
        }}
        style={{ width: "100vw", height: "80vh" }}
      >
        <NavigationControl showCompass={false} />
        <Markers trackerPositions={trackerPositions} />
        <LineOverlay trackerPositions={trackerPositions} />
      </MapView>
    </>
  );
}

export default App;
