"use client";

import React, { useState } from "react";
import { useCurrency } from "@/components/common/CurrencyContext";
import { useUnitMeasurement } from "@/components/common/UnitMeasurementContext";

type PreferenceModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onSave: (values: {
		language: string;
		currency: string;
		unit: string;
	}) => void;
	languages: { code: string; label: string }[];
	currencyOptions: { code: string; label: string }[];
	measurementUnitOptions: { code: string; label: string }[];
	selectedLang: string;
};

export default function PreferenceModal({
	isOpen,
	onClose,
	onSave,
	languages,
	currencyOptions,
	measurementUnitOptions,
	selectedLang,
}: PreferenceModalProps) {
	const { currency, setCurrency } = useCurrency();
	const { unit, setUnit, formatArea } = useUnitMeasurement();

	const [language, setLanguage] = useState(selectedLang);

	if (!isOpen) return null;

	const handleSave = () => {
		onSave({
			language,
			currency,
			unit,
		});
		onClose();
	};

	return (
		<div className="modal-backdrop-overlay">
			<div className="modal">
				{/* Header */}
				<div className="modal-header">
					<span className="modal-title">Preference Settings</span>
					<button className="closeBtn" onClick={onClose} aria-label="Close">
						✕
					</button>
				</div>

				{/* Body */}
				<div className="body">
					{/* Language */}
					<div className="section pb-3">
						<div className="sectionLabel">Language</div>
						<div className="radioRow">
							{languages.map((lng) => (
								<label className="radioLabel" key={lng.code}>
									<input
										type="radio"
										name="language"
										value={lng.code}
										checked={language === lng.code}
										onChange={(e) => {
											setLanguage(lng.code);
										}}
									/>
									<span>{lng.label}</span>
								</label>
							))}
						</div>
					</div>

					{/* Currency */}
					<div className="section pb-3">
						<div className="sectionLabel">
							Currency<span className="required">*</span>
						</div>
						<div className="radioRow">
							{currencyOptions.map((cur) => (
								<label className="radioLabel" key={cur.code}>
									<input
										type="radio"
										name="cur"
										value={cur.code}
										checked={currency === cur.code}
										onChange={(e) => {
											setCurrency(cur.code);
										}}
									/>
									<span>{cur.label}</span>
								</label>
							))}
						</div>
					</div>

					{/* Units */}
					<div className="section pb-3">
						<div className="sectionLabel">
							Units<span className="hash">#</span>
						</div>
						<div className="radioRow">
							{measurementUnitOptions.map((measureUnit) => (
								<label className="radioLabel" key={measureUnit.code}>
									<input
										type="radio"
										name="unit"
										value={measureUnit.code}
										checked={unit === measureUnit.code}
										onChange={(e) => {
											setUnit(measureUnit.code);
										}}
									/>
									<span>{measureUnit.label}</span>
								</label>
							))}
						</div>
					</div>

					{/* Notes */}
					<hr />
					<div className="notes">
						<br />
						<p>
							* Exchange rates are for reference only, may change without prior
							notice, and our company does not guarantee their accuracy. Please
							confirm the current rate with your bank or official source before
							making any currency exchange.
						</p>
						<br />
						<p># m² ≈ ft² ÷ 10.764 (rounded to the nearest integer)</p>
					</div>
				</div>

				{/* Footer */}
				<div className="footer">
					<button className="cancelBtn" onClick={onClose}>
						Cancel
					</button>
					<button className="saveBtn" onClick={handleSave}>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}
