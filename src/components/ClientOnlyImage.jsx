import { useEffect, useState } from "react";

export default function ClientOnlyImage({ getImageUrl, ...props }) {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(getImageUrl());
  }, []);
  if (!url) return null;
  return <img src={url} {...props} />;
}
