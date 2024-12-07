import { Skeleton, Box, Grid } from "@mui/material";

// Skeleton Loading Component
const MoviesLoadingSkeleton = () => {
  return (
    <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen">
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow container mx-auto py-8">
          {/* Intro Section Skeleton */}
          <section className="mb-10 text-center">
            <Skeleton variant="text" sx={{ fontSize: "2.5rem", width: "50%", margin: "0 auto", bgcolor: "gray" }} />
            <Skeleton variant="text" sx={{ fontSize: "1.125rem", width: "60%", margin: "10px auto", bgcolor: "gray" }} />
          </section>

          {/* Movie Grid Skeleton */}
          <section>
            <h3 className="text-xl font-bold m-4 ">Movies</h3>
            <Grid container spacing={4} sx={{ mx: 4 }}>
              {Array.from({ length: 8 }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  {/* Movie Card Skeleton */}
                  <Box sx={{ width: "100%" }}>
                    <Skeleton variant="rectangular" width="100%" height={200} sx={{ bgcolor: "gray" }} />
                    <Skeleton variant="text" sx={{ width: "60%", mt: 1, bgcolor: "gray" }} />
                    <Skeleton variant="text" sx={{ width: "80%", bgcolor: "gray" }} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </section>
        </main>

        {/* Footer Skeleton */}
        <footer className="bg-gray-600 text-gray-200 py-4">
          <div className="container mx-auto text-center">
            <Skeleton variant="text" sx={{ width: "30%", margin: "0 auto", bgcolor: "gray" }} />
          </div>
        </footer>
      </div>
    </section>
  );
};

export default MoviesLoadingSkeleton;
