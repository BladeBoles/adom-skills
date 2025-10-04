import { Suspense } from 'react';
import { CalculatorForm } from '@/components/calculator-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'ADOM Skills Calculator - Race & Profession',
  description: 'Calculate starting skills for ADOM race and profession combinations',
};

export default function CalculatorPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Skills Calculator</CardTitle>
          <CardDescription>
            Select a race and profession to see starting skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>
            <CalculatorForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
