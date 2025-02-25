import { Stack, Slider, Text } from "@mantine/core";
import { useCountStore } from "../store";
import { formatNumber } from "../utils/table-utils";
import { useLocation } from "react-router";
import { useEffect, useRef, useState } from "react";

export const DataCountSlider = () => {
  const count = useCountStore((s) => s.count);
  const setCount = useCountStore((s) => s.setCount);

  const [_count, _setCount] = useState(count);

  const location = useLocation();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setCount(_count);
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [_count]);

  return (
    <Stack>
      <Text>Data row count - {formatNumber(_count)}</Text>
      <Slider
        min={1_000}
        max={location.pathname === "/improved" ? 750_000 : 15_000}
        step={1_000}
        value={_count}
        label={(val) => formatNumber(val)}
        onChange={(value) => _setCount(value)}
      />
    </Stack>
  );
};
