import { render, screen, fireEvent } from "@testing-library/react";
import ProgressBar from "@/components/player/progressBar";
import "@testing-library/jest-dom";

describe("ProgressBar component", () => {
  it("renders with correct max and value attributes", () => {
    render(
      <ProgressBar
        max={100}
        value={{ currentTime: 50, duration: 100 }}
        step={1}
        onChange={() => {}}
        audioRef={null}
      />
    );
    const progressBar = screen.getByRole("slider");
    expect(progressBar).toHaveAttribute("max", "100");
    expect(progressBar).toHaveAttribute("value", "50");
  });

  it("calls onChange when value changes", () => {
    const handleChange = jest.fn();
    render(
      <ProgressBar
        max={100}
        value={{ currentTime: 50, duration: 100 }}
        step={1}
        onChange={handleChange}
        audioRef={null}
      />
    );
    const progressBar = screen.getByRole("slider");
    fireEvent.change(progressBar, { target: { value: "70" } });
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });
});
