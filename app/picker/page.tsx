import { Suspense } from 'react';
import { PickerForm } from '@/components/picker-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'ADOM Skills Picker - Find Race & Profession Combos',
  description: 'Find all ADOM race and profession combinations that provide your desired skills',
};

export default function PickerPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Skills Picker</CardTitle>
          <CardDescription>
            Select desired skills to find all matching race/profession combinations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>
            <PickerForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
