import { LegalPage, LegalNav } from "@/components/legal/LegalPage";

export default function Page() {
  return (
    <div>
      <LegalPage title="TERMS" description="Legal information about how Arcade Vault operates." />
      <LegalNav />
    </div>
  );
}
