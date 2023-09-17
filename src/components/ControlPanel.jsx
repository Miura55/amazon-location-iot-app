import { memo } from "react";
import { View, Text, Card, Flex, Button } from "@aws-amplify/ui-react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function ControlPanel() {
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker />
            </DemoContainer>
          </LocalizationProvider>
        </Card>
        <Card>
          <Text fontSize={"medium"} fontWeight={400}>
            End Time
          </Text>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker />
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
