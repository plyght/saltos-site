import { WikiPanel } from "@/components/wiki-panel";
import { SiteFoot } from "@/components/site-foot";
import { Article } from "@/components/article";

export default function Home() {
  return (
    <div id="top" className="wiki">
      <WikiPanel current="/" />
      <Article />
      <SiteFoot />
    </div>
  );
}
