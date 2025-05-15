import DemoDashboard from "./components/DemoDashboard";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen p-8" style={{ background: 'linear-gradient(135deg, #f9f5eb 0%, #f5f0e0 50%, #f9f5eb 100%)' }}>
      <div className="mb-6">
        <Image 
          src="/paperminds_logo_small.png" 
          alt="PaperMinds Logo" 
          width={150} 
          height={40} 
          style={{ width: 'auto', height: 'auto' }}
          priority
        />
      </div>
      <DemoDashboard />
    </main>
  );
}
