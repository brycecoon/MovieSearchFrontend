import { Skeleton, Box } from "@mui/material";

const AdminLoadingSkeleton = () => {
  return (
    <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
        {/* Dashboard Title Skeleton */}
        <Skeleton variant="text" sx={{ fontSize: "2.25rem", width: "60%", margin: "0 auto", bgcolor: "gray" }} />

        {/* Admin Information Skeleton */}
        <div className="space-y-6">
          <div className="text-xl">
            <Skeleton variant="text" sx={{ width: "60%", bgcolor: "gray" }} />
          </div>
          <div className="text-xl">
            <Skeleton variant="text" sx={{ width: "60%", bgcolor: "gray" }} />
          </div>
          <div className="text-xl">
            <Skeleton variant="text" sx={{ width: "60%", bgcolor: "gray" }} />
          </div>
        </div>

        {/* Admin Options Skeleton */}
        <div className="mt-6 flex justify-center">
          <Box sx={{ width: 200 }}>
            <Skeleton variant="rectangular" sx={{ height: 48, bgcolor: "gray" }} />
          </Box>
        </div>
      </div>
    </section>
  );
};

export default AdminLoadingSkeleton;
