import * as React from "react";
import {
  FluentProvider,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
  Theme,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";
import CardComponent from "./CardComponent";

export interface RecordType {
  Count: number;
  StatusReason: string;
  TaskType: string;
}

interface propsTypes {
  theme: string;
  JSOnRecords: RecordType[];
  Status: string[];
  cardSize : "small" | "medium" | "large";
  wrapCards : string;
  appearance : "filled" | "filled-alternative" | "outline" | "subtle" | undefined;
}

const Cards: React.FC<propsTypes> = ({ theme, JSOnRecords, Status, cardSize, wrapCards, appearance }) => {
  const FluenUITheme: Record<string, Theme> = {
    webLightTheme: webLightTheme,
    webDarkTheme: webDarkTheme,
    teamsLightTheme: teamsLightTheme,
    teamsHighContrastTheme: teamsHighContrastTheme,
    teamsDarkTheme: teamsDarkTheme,
  };

  const groupedRecords = JSOnRecords.reduce<Record<string, RecordType[]>>(
    (acc, record) => {
      const { TaskType } = record;

      // Initialize the TaskType array if it doesn't exist
      if (!acc[TaskType]) {
        acc[TaskType] = [];
      }
      acc[TaskType].push(record);

      return acc;
    },
    {}
  );

  return (
    <FluentProvider theme={FluenUITheme[theme]}>
      <div className="cardsContainer" style={{  gridTemplateColumns: `repeat(${wrapCards}, minmax(200px, 900px))`
}}>
        {Object.entries(groupedRecords).map(([taskType, records], index) => {
          if (records.length > 1) {
            return (
              <CardComponent
                taskType={taskType}
                Status={Status}
                records={records}
                key={index}
                size={cardSize}
                appearance={appearance}
              />
            );
          } else {
            return (
              <CardComponent
                taskType={taskType}
                Status={Status}
                records={records}
                key={index}
                size={cardSize}
                appearance={appearance}

              />
            );
          }
        })}
      </div>
    </FluentProvider>
  );
};

export default React.memo(Cards);
