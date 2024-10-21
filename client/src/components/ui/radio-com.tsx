import React from "react"
import { Button } from "./button"
import { Label } from "./label"
import { RadioGroup, RadioGroupItem } from "./radio-group"

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <h1 className="mb-6 text-2xl font-bold text-zinc-700">Search by Price</h1>

      <div className="flex items-center space-x-2 mt-4">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Under 10,000 BDT</Label>
      </div>

      <div className="flex items-center space-x-2 mt-4">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">10,000 - 25,000 BDT</Label>
      </div>

      <div className="flex items-center space-x-2 mt-4">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">25,000 - 50,000 BDT</Label>
      </div>

      <div className="flex items-center space-x-2 mt-4">
        <RadioGroupItem value="premium" id="r4" />
        <Label htmlFor="r4">Above 50,000 BDT</Label>
      </div>
      <div className="flex items-center space-x-2 mt-4">
        <RadioGroupItem value="allPrices" id="r5" />
        <Label htmlFor="r5">For All Prices</Label>
      </div>
      <div className="flex items-center space-x-2 w-full mt-6">
        <Button variant="outline" className="w-full">Reset Filters</Button>
      </div>
    </RadioGroup>

  )
}
