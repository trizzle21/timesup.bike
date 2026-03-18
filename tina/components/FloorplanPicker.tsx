import React from "react";

interface Position {
  x: number;
  y: number;
}

function FloorplanPicker(props: any) {
  const { input } = props;
  const positions: Position[] = Array.isArray(input.value)
    ? input.value.filter((p: any) => p?.x != null && p?.y != null)
    : [];

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newX = Math.round(((e.clientX - rect.left) / rect.width) * 1000) / 10;
    const newY = Math.round(((e.clientY - rect.top) / rect.height) * 1000) / 10;
    input.onChange([...positions, { x: newX, y: newY }]);
  };

  const handleRemove = (index: number) => {
    const updated = positions.filter((_, i) => i !== index);
    input.onChange(updated.length > 0 ? updated : null);
  };

  const handleClearAll = () => {
    input.onChange(null);
  };

  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: "14px",
          fontWeight: 600,
          marginBottom: "8px",
        }}
      >
        Map Positions ({positions.length})
      </label>
      <div
        onClick={handleClick}
        style={{
          position: "relative",
          cursor: "crosshair",
          display: "inline-block",
          maxWidth: "100%",
          borderRadius: "8px",
          overflow: "hidden",
          border: "2px solid #e1e1e1",
        }}
      >
        <img
          src="/tu_floorplan_empty.png"
          alt="Floorplan"
          style={{ display: "block", width: "100%", height: "auto" }}
          draggable={false}
        />
        {positions.map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: "#e53e3e",
              border: "3px solid white",
              boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          />
        ))}
      </div>
      <div style={{ marginTop: "8px", fontSize: "13px", color: "#666" }}>
        {positions.length > 0 ? (
          <div>
            {positions.map((pos, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <span>#{i + 1}: ({pos.x}%, {pos.y}%)</span>
                <button
                  type="button"
                  onClick={() => handleRemove(i)}
                  style={{
                    padding: "1px 6px",
                    fontSize: "11px",
                    cursor: "pointer",
                    background: "#f0f0f0",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleClearAll}
              style={{
                marginTop: "4px",
                padding: "2px 8px",
                fontSize: "12px",
                cursor: "pointer",
                background: "#f0f0f0",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              Clear All
            </button>
          </div>
        ) : (
          <span>Click on the floorplan to add positions</span>
        )}
      </div>
    </div>
  );
}

export default FloorplanPicker;
