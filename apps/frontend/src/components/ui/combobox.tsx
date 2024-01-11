import { useEffect, useRef, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Button } from "./button"
import { Check, ChevronsUpDown } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./command"
import { cn } from "@/lib/utils"

type Props = {
	name?: string;
	options: { value: string; label: string }[];
	value?: string;

	placeholder?: string;
	empty?: string;

	onSearchChange?(value: string): void;
	onChange?(value: any): void;
}

export default function Combobox(props: Props) {
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState(props.value || "")

	const debounce = useRef<any>()

	useEffect(() => {
		setValue(props.value || "")
	}, [props.value])

	return (
		<>
			<input type="hidden" name={props.name} value={value} /> 
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-full justify-between"
					>
						{value
							? props.options.find((option) => option.value === value)?.label
							: props.placeholder}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-full p-0">
					<Command shouldFilter={false}>
						<CommandInput placeholder={props.placeholder} onValueChange={(value) => {
							if (props.onSearchChange) {
								if (debounce.current) {
									clearTimeout(debounce.current)
								}

								debounce.current = setTimeout(() => props.onSearchChange!(value), 1250)
							}
						}} />
						{props.empty && <CommandEmpty>{props.empty}</CommandEmpty>}
						<CommandGroup>
							{props.options.map((option) => (
								<CommandItem
									key={option.value}
									value={option.value}
									onSelect={(currentValue: any) => {
										setValue(currentValue === value ? "" : currentValue)
										props.onChange?.(currentValue === value ? "" : currentValue)
										setOpen(false)										
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === option.value ? "opacity-100" : "opacity-0"
										)}
									/>
									{option.label}
								</CommandItem>
							))}
						</CommandGroup>
					</Command>
				</PopoverContent>
			</Popover>
		</>
	)
}