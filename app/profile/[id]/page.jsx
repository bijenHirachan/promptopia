"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import Profile from "@components/Profile";

const OtherProfilePage = () => {
  const { data: session } = useSession();

  const params = useParams();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${params.id}/posts`);
      const data = await res.json();

      setPosts(data);
    };

    if (params.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={`${posts[0]?.creator.username}'s`}
      desc={`Welcome to ${posts[0]?.creator.username}'s  personalized profile page`}
      data={posts}
    />
  );
};

export default OtherProfilePage;
