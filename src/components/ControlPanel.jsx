import { memo } from "react";
import { View, Text, Card, Flex, Button } from "@aws-amplify/ui-react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function ControlPanel() {
  const handleDateTimeChange = (date) => {
    console.log(date);
  };

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
              <DateTimePicker onChange={handleDateTimeChange} />
            </DemoContainer>
          </LocalizationProvider>
        </Card>
        <Card>
          <Text fontSize={"medium"} fontWeight={400}>
            End Time
          </Text>
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker onChange={handleDateTimeChange} />
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
            console.log("clicked");
          }}
        >
          Filter
        </Button>
      </Flex>
    </View>
  );
}

export default memo(ControlPanel);
