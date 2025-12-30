import React from "react"
import "./PersonCard.css"
type Props = {
	name: string
	role: string
	imgSrc?: string
}

export default function PersonCard({ name, role, imgSrc }: Props) {
	const initials = name
		.split(" ")
		.map((s) => s[0])
		.join("")

	return (
		<article className="person-card" role="article">
			<div className="person-media">
				{imgSrc ? (
					<img src={imgSrc} alt={name} />
				) : (
					<div className="person-placeholder">
						<span className="person-initials">{initials}</span>
					</div>
				)}
			</div>

			<div className="person-copy">
				<h3 className="person-name">{name}</h3>
				<p className="person-role">{role}</p>
			</div>
		</article>
	)
}

