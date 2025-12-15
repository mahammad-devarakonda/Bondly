import React, { lazy, Suspense } from "react";
const UserFeed = lazy(() => import('./UserFeed'))

const Feed = () => {

  return (
    <div className="flex w-full">
      <main className="flex justify-center items-center w-full transition-all duration-300">
        <Suspense fallback={<div className="text-center w-full text-gray-500">Loading feed...</div>}>
          <UserFeed />
        </Suspense>
      </main>
    </div>
  );
};

export default Feed;
