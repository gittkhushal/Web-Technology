'use client'

import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from 'react'
import DraggableWidgetGrid, { type WidgetItem } from './draggable-widget-grid'

/* ------------------------------------------------------------------ *
 * UML Statistics Dashboard
 * ------------------------------------------------------------------ */

type Kind =
	| 'totalClasses'
	| 'totalAttributes'
	| 'totalMethods'
	| 'completeness'
	| 'recentClasses'
	| 'classBreakdown'

interface Widget extends WidgetItem {
	kind: Kind
}

const WIDGETS: Widget[] = [
	{ id: 'total-classes', kind: 'totalClasses', size: 'sm', label: 'Total Classes' },
	{ id: 'total-attributes', kind: 'totalAttributes', size: 'sm', label: 'Total Attributes' },
	{ id: 'total-methods', kind: 'totalMethods', size: 'sm', label: 'Total Methods' },
	{ id: 'completeness', kind: 'completeness', size: 'sm', label: 'Completeness Score' },
	{ id: 'recent-classes', kind: 'recentClasses', size: 'wide', label: 'Recent Classes' },
	{ id: 'class-breakdown', kind: 'classBreakdown', size: 'wide', label: 'Class Breakdown' },
]

/* ------------------------------------------------------------------ *
 * Live data
 * ------------------------------------------------------------------ */

interface DashboardData {
    classes: any[];
    generatedCode: string;
}

const DataContext = createContext<DashboardData>({ classes: [], generatedCode: '' })

const PALETTE = [
	'[--background:#ffffff] [--color-background:#ffffff] [--foreground:#09090b] [--color-foreground:#09090b] [--card:#ffffff] [--color-card:#ffffff] [--card-foreground:#09090b] [--color-card-foreground:#09090b] [--muted-foreground:#71717a] [--color-muted-foreground:#71717a] [--border:#e4e4e7] [--color-border:#e4e4e7] [--ring:#18181b] [--color-ring:#18181b]',
	'dark:[--background:#0a0a0b] dark:[--color-background:#0a0a0b] dark:[--foreground:#fafafa] dark:[--color-foreground:#fafafa] dark:[--card:#141417] dark:[--color-card:#141417] dark:[--card-foreground:#fafafa] dark:[--color-card-foreground:#fafafa] dark:[--muted-foreground:#a1a1aa] dark:[--color-muted-foreground:#a1a1aa] dark:[--border:#27272a] dark:[--color-border:#27272a] dark:[--ring:#d4d4d8] dark:[--color-ring:#d4d4d8]',
].join(' ')

const FONT_URL =
	'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap'
const FONT =
	"'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

type Tone = 'ok' | 'warn' | 'err' | 'idle'

const DOT: Record<Tone, string> = {
	ok: 'bg-emerald-500',
	warn: 'bg-amber-500',
	err: 'bg-rose-500',
	idle: 'bg-muted-foreground/60',
}

const TEXT: Record<Tone, string> = {
	ok: 'text-emerald-600 dark:text-emerald-400',
	warn: 'text-amber-600 dark:text-amber-300',
	err: 'text-rose-600 dark:text-rose-400',
	idle: 'text-muted-foreground',
}

/* ------------------------------------------------------------------ *
 * Building blocks
 * ------------------------------------------------------------------ */

function Shell({
	title,
	meta,
	children,
}: {
	title: string
	meta?: ReactNode
	children: ReactNode
}) {
	return (
		<section className="@container flex h-full flex-col gap-4 p-4 sm:p-[22px]">
			<header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 text-[14px] leading-none">
				<h3 className="truncate text-[12px] tracking-[0.1em] text-muted-foreground uppercase">
					{title}
				</h3>
				{meta && <span className="shrink-0 text-muted-foreground">{meta}</span>}
			</header>
			<div className="flex min-h-0 flex-1 flex-col">{children}</div>
		</section>
	)
}

function Big({
	children,
	unit,
	unitWide = false,
}: {
	children: ReactNode
	unit?: string
	unitWide?: boolean
}) {
	return (
		<p className="text-[28px] leading-none font-normal tracking-tight text-foreground tabular-nums @[240px]:text-[30px]">
			{children}
			{unit && (
				<span
					className={`text-[13px] tracking-normal text-muted-foreground ${
						unitWide ? 'sr-only @[200px]:not-sr-only' : ''
					}`}>
					{'\u00a0'}
					{unit}
				</span>
			)}
		</p>
	)
}

function Dot({ tone, pulse = false }: { tone: Tone; pulse?: boolean }) {
	return (
		<span aria-hidden="true" className="relative inline-flex size-2 shrink-0">
			{pulse && (
				<span
					className={`absolute inset-0 animate-ping rounded-full opacity-50 motion-reduce:hidden ${DOT[tone]}`}
				/>
			)}
			<span className={`relative size-2 rounded-full ${DOT[tone]}`} />
		</span>
	)
}

function Row({
	children,
	value,
	className = '',
}: {
	children: ReactNode
	value: ReactNode
	className?: string
}) {
	return (
		<div className={`flex items-center gap-2 text-[13px] ${className}`}>
			<dt className="flex min-w-0 items-center gap-2 truncate text-foreground">
				{children}
			</dt>
			<dd className="ml-auto text-muted-foreground tabular-nums">{value}</dd>
		</div>
	)
}

/* ------------------------------------------------------------------ *
 * Widgets
 * ------------------------------------------------------------------ */

function TotalClasses() {
	const { classes } = useContext(DataContext)
	const total = classes.length
	return (
		<Shell title="Total Classes" meta={<Dot tone={total > 0 ? 'ok' : 'idle'} pulse={total > 0} />}>
			<Big>{total}</Big>
            <p className="mt-3 text-[13px] text-muted-foreground">
                Classes created in this diagram.
            </p>
		</Shell>
	)
}

function TotalAttributes() {
	const { classes } = useContext(DataContext)
	const total = classes.reduce((acc, cls) => acc + (cls.attributes?.length || 0), 0)
	return (
		<Shell title="Total Attributes" meta={<Dot tone="idle" />}>
			<Big>{total}</Big>
            <p className="mt-3 text-[13px] text-muted-foreground">
                Total attributes defined across all classes.
            </p>
		</Shell>
	)
}

function TotalMethods() {
	const { classes } = useContext(DataContext)
	const total = classes.reduce((acc, cls) => acc + (cls.methods?.length || 0), 0)
	return (
		<Shell title="Total Methods" meta={<Dot tone="idle" />}>
			<Big>{total}</Big>
            <p className="mt-3 text-[13px] text-muted-foreground">
                Total methods defined across all classes.
            </p>
		</Shell>
	)
}

function Completeness() {
	const { classes } = useContext(DataContext)
	const total = classes.length
    
    // A class is "complete" if it has at least one attribute and one method
    let completeCount = 0;
    classes.forEach(c => {
        if (c.attributes?.length > 0 && c.methods?.length > 0) completeCount++;
    });

    const score = total === 0 ? 0 : completeCount / total;

	return (
		<Shell title="Completeness Score">
			<div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
				<Big>{score.toFixed(2)}</Big>
				<span className={`text-[14px] tabular-nums ${TEXT[score >= 0.5 ? 'ok' : 'warn']}`}>
					{Math.round(score * 100)}%
				</span>
			</div>
            <p className="mt-auto text-[13px] text-muted-foreground">
                Classes with both attributes and methods.
            </p>
		</Shell>
	)
}

function RecentClasses() {
	const { classes } = useContext(DataContext)
    const recent = [...classes].reverse().slice(0, 4)
	return (
		<Shell title="Recent Classes" meta="latest additions">
			<Big unit="classes">{recent.length}</Big>
			<table className="mt-auto w-full table-fixed text-left text-[13px]">
				<thead className="sr-only">
					<tr>
						<th scope="col">name</th>
						<th scope="col">attrs</th>
						<th scope="col">methods</th>
					</tr>
				</thead>
				<tbody>
                    {recent.length === 0 && (
                        <tr><td className="text-muted-foreground py-2">No classes yet.</td></tr>
                    )}
					{recent.map((r, i) => (
						<tr key={i}>
							<th
								scope="row"
								className={`w-[140px] truncate py-[6px] pr-3 font-normal ${
									i === 0 ? 'text-foreground' : 'text-muted-foreground'
								}`}>
								{r.name}
							</th>
							<td className="py-[6px] text-muted-foreground">
								{r.attributes?.length || 0} attrs
							</td>
							<td className="w-[80px] py-[6px] text-right text-muted-foreground tabular-nums">
								{r.methods?.length || 0} methods
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Shell>
	)
}

function ClassBreakdown() {
	const { classes } = useContext(DataContext)
    
    const rows = classes.map(c => ({
        name: c.name,
        attrs: c.attributes?.length || 0,
        methods: c.methods?.length || 0,
        total: (c.attributes?.length || 0) + (c.methods?.length || 0)
    })).sort((a, b) => b.total - a.total).slice(0, 4) // top 4 largest classes

	return (
		<Shell title="Largest Classes" meta="by members">
			<Big unit="classes">{classes.length}</Big>
			<dl className="mt-auto grid grid-cols-2 gap-x-6 gap-y-2">
				{rows.map((m) => (
					<Row key={m.name} value={`${m.total} members`}>
						<span
							aria-hidden="true"
							className={`size-1.5 shrink-0 rounded-full bg-blue-500`}
						/>
						<span className="truncate">{m.name}</span>
					</Row>
				))}
                {rows.length === 0 && (
                    <span className="text-muted-foreground text-[13px]">Add a class to see breakdown.</span>
                )}
			</dl>
		</Shell>
	)
}

/* ------------------------------------------------------------------ *
 * Board
 * ------------------------------------------------------------------ */

const VIEWS: Record<Kind, () => ReactNode> = {
	totalClasses: TotalClasses,
	totalAttributes: TotalAttributes,
	totalMethods: TotalMethods,
	recentClasses: RecentClasses,
	completeness: Completeness,
	classBreakdown: ClassBreakdown,
}

const renderWidget = (item: Widget) => {
	const View = VIEWS[item.kind]
	return <View />
}

export default function Dashboard({ classes = [], generatedCode = '' }: { classes?: any[], generatedCode?: string }) {
	return (
		<div
			className={`flex h-full w-full items-start justify-center bg-background px-4 py-8 text-foreground antialiased ${PALETTE}`}
			style={{ fontFamily: FONT }}>
			<link rel="stylesheet" href={FONT_URL} />
			<div className="w-full max-w-[1180px]">
				<p className="mb-4 text-[14px] text-muted-foreground">
					<span className="[@media(pointer:coarse)]:hidden">
						Drag and rearrange widgets to customize your dashboard layout.
					</span>
					<span className="hidden [@media(pointer:coarse)]:inline">
						Press and hold a widget, then drag to rearrange your dashboard.
					</span>
				</p>
				<section aria-labelledby="agent-observability-title">
					<h2 id="agent-observability-title" className="sr-only">
						UML Dashboard
					</h2>
					<DataContext.Provider value={{ classes, generatedCode }}>
						<DraggableWidgetGrid
							items={WIDGETS}
							renderItem={(item) => renderWidget(item as Widget)}
						/>
					</DataContext.Provider>
				</section>
			</div>
		</div>
	)
}
