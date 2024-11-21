interface ProgressIndicatorProps {
  pageNumber: number;
  totalPages: number;
}

const ProgressIndicator = ({
  pageNumber,
  totalPages,
}: ProgressIndicatorProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.625rem",
        alignSelf: "stretch",
      }}
    >
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <div
            key={page}
            style={{
              width: "0.625rem",
              height: "0.625rem",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
            >
              <circle
                cx="5"
                cy="5"
                r="5"
                fill={page == pageNumber ? "#303030" : "#D9D9D9"}
              />
            </svg>
          </div>
        ),
      )}
    </div>
  );
};

export default ProgressIndicator;
