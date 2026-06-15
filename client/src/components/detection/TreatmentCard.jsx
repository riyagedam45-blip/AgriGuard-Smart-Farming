import { ShieldCheck, ArrowRight, Sprout, Droplets, AlertCircle } from 'lucide-react';
import Card from '../ui/Card';

export default function TreatmentCard({ treatment }) {
  if (!treatment) return null;

  return (
    <Card className="p-0 overflow-hidden border-none shadow-lg">
      <div className="bg-gradient-to-r from-surface-800 to-surface-900 px-6 py-4">
        <h2 className="text-xl font-display font-semibold text-white flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-primary-400" />
          Treatment Recommendation
        </h2>
      </div>

      <div className="p-6 space-y-8">
        <div>
          <p className="text-surface-700 leading-relaxed text-lg">{treatment.description}</p>
        </div>

        {treatment.steps && treatment.steps.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-surface-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Recommended Actions
            </h3>
            <ul className="space-y-3">
              {treatment.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-surface-50 p-3 rounded-xl">
                  <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center shrink-0 font-semibold text-sm mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="text-surface-700">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {treatment.prevention && treatment.prevention.length > 0 && (
            <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
              <h3 className="text-sm font-semibold text-blue-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Prevention
              </h3>
              <ul className="space-y-2">
                {treatment.prevention.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-blue-900 text-sm">
                    <ArrowRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {treatment.organicAlternatives && treatment.organicAlternatives.length > 0 && (
            <div className="bg-primary-50/50 p-5 rounded-2xl border border-primary-100">
              <h3 className="text-sm font-semibold text-primary-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Sprout className="w-4 h-4" /> Organic Options
              </h3>
              <ul className="space-y-2">
                {treatment.organicAlternatives.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-primary-900 text-sm">
                    <Droplets className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
