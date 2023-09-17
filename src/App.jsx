import { MapView } from "@aws-amplify/ui-react-geo";
import { NavigationControl } from "react-map-gl";
import { DateTime } from "luxon";
import Markers from "./components/Markers";
import LineOverlay from "./components/LineOverlay";
import useTracker from "./hooks/useTracker";

function App() {
  const [trackerPositions] = useTracker({
    DeviceId: "core2",
    TrackerName: "trackerAsset01", // This is the Tracker name, change it according to your own setup
    EndTimeExclusive: DateTime.local().toJSDate(),
    StartTimeInclusive: DateTime.local().minus({ days: 30 }).toJSDate(),
  });

  return (
    <>
      <MapView
        initialViewState={{
          longitude: 137.1676,
          latitude: 34.9548,
          zoom: 14,
        }}
        style={{ width: "100vw", height: "100vh" }}
      >
        <NavigationControl showCompass={false} />
        <Markers trackerPositions={trackerPositions} />
        <LineOverlay trackerPositions={trackerPositions} />
      </MapView>
    </>
  );
}

export default App;
