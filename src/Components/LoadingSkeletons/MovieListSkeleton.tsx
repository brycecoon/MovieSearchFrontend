import { Skeleton, Box } from "@mui/material";

// Skeleton Loading Component for the "Create a New List" page
const MovieListSkeleton = () => {
  return (
    <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen px-6 py-12">
      {/* Create New List Section Skeleton */}
      <div className="mb-6 text-center">
        <Skeleton variant="text" sx={{ fontSize: "2rem", width: "50%", margin: "0 auto", bgcolor: "gray" }} />
        <Skeleton variant="rectangular" sx={{ width: "100%", height: 48, borderRadius: "0.375rem", bgcolor: "gray", mt: 2 }} />
        <Skeleton variant="rectangular" sx={{ width: "100%", height: 48, borderRadius: "0.375rem", bgcolor: "gray", mt: 2 }} />
      </div>

      {/* My Lists Section Skeleton */}
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-2 justify-center">
        <Skeleton variant="text" sx={{ fontSize: "3rem", width: "50%", margin: "0 auto", bgcolor: "gray" }} />
      </section>

      {/* Lists Skeleton */}
      <div>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="w-full">
            {/* List Card Skeleton */}
            <div className="bg-slate-500 rounded-lg shadow-lg shadow-gray-700">
              <div className="text-3xl pt-7 pb-3 bg-black text-white flex pl-5 capitalize font-semibold rounded-t-lg mt-5 shadow-[0_4px_10px_2px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-4">
                  {/* Skeleton for the list name */}
                  <Skeleton variant="text" sx={{ width: "60%", bgcolor: "gray" }} />
                  <Skeleton variant="circular" width={30} height={30} sx={{ bgcolor: "gray" }} />
                  <Skeleton variant="circular" width={30} height={30} sx={{ bgcolor: "gray" }} />
                </div>
              </div>
              {/* Skeleton for movie list */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, padding: 2 }}>
                {Array.from({ length: 5 }).map((_, movieIndex) => (
                  <Skeleton key={movieIndex} variant="rectangular" width={120} height={180} sx={{ bgcolor: "gray" }} />
                ))}
              </Box>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieListSkeleton;
