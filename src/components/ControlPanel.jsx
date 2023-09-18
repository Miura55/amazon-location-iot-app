import { memo, useState } from "react";
import { View, Text, Card, Flex, Button } from "@aws-amplify/ui-react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DateTime } from "luxon";

function ControlPanel({ handleDateTimeChange }) {
  const [ startDateTime, setStartDateTime ] = useState(DateTime.local()); // [1]
  const [ endDateTime, setEndDateTime ] = useState(DateTime.local().minus({ days: 30 })); // [2]

  return (
    <View padding="10px" height={"10rem"}>
      <Text fontSize={"large"} fontWeight={550}>
        Travel Log
      </Text>
      <Flex direction="row" justifyContent={"center"} alignItems={'center'} wrap={"nowrap"}>
        <Card>
          <Text fontSize={"medium"} fontWeight={400}>
            Start Time
          </Text>
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker onChange={setStartDateTime} />
            </DemoContainer>
          </LocalizationProvider>
        </Card>
        <Card>
          <Text fontSize={"medium"} fontWeight={400}>
            End Time
          </Text>
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker onChange={setEndDateTime} />
            </DemoContainer>
          </LocalizationProvider>
        </Card>
        <Button
          variation="primary"
          colorTheme="info"
          size="large"
          height={"4rem"}
          width={"6rem"}
          onClick={() => {
            handleDateTimeChange(startDateTime, endDateTime);
          }}
        >
          Filter
        </Button>
      </Flex>
    </View>
  );
}

export default memo(ControlPanel);
