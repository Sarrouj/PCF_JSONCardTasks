import { Card, CardHeader, Text, tokens } from "@fluentui/react-components";
import * as React from "react";
import { RecordType } from "./Cards";

interface Cardprops {
  taskType: string;
  Status: string[];
  records: RecordType[];
  size: "small" | "medium" | "large";
  appearance:
    | "filled"
    | "filled-alternative"
    | "outline"
    | "subtle"
    | undefined;
}

const CardComponent: React.FC<Cardprops> = ({
  taskType,
  Status,
  records,
  size,
  appearance,
}) => {
  return (
    <Card size={size} className="Card" appearance={appearance}>
      <CardHeader header={<Text weight="bold">{taskType}</Text>} />
      <div
        style={{
          background: `${tokens.colorNeutralBackground5} `,
          padding: "10px",

        }}
        className="CardItemsContainer"
      >
        {Status.map((stat, index) => {
          const total = records
            .filter((record) => record.StatusReason === stat)
            .reduce((sum, record) => sum + record.Count, 0);
          return (
            <div key={index} className="Carditem" style={{
                background: `${tokens.colorNeutralCardBackground} `,
      
              }}>
              <Text as="p" align="center" font="monospace" size={300}>
                {stat}: {total}
              </Text>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default React.memo(CardComponent);
