import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import SuccessStoriesClient from "./SuccessStoriesClient";

export default function SuccessStoriesPage() {
  return <SuccessStoriesClient />;
}

export const metadata = {
  title: "Alumni Success Stories | Sharda University Alumni Portal",
  description: "Read inspiring success stories from Sharda University alumni who are making an impact across industries worldwide.",
}; 