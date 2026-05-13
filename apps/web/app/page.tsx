import { AgencyHomePage, AgencyShell } from "../components/public/AgencyMarketing";

export default function ShowcasePage() {
  return (
    <AgencyShell active="home">
      <AgencyHomePage />
    </AgencyShell>
  );
}
