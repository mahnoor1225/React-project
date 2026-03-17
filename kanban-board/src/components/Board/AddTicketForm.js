import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { editTicket } from "../../Store/BoardSlice";

const validationSchema = Yup.object({
    title: Yup.string()
        .trim()
        .min(3, "Min 3 characters")
        .max(80, "Max 80 characters")
        .required("Title is required"),
    description: Yup.string()
        .max(300, "Max 300 characters"),
    priority: Yup.string()
        .oneOf(["high", "medium", "low"])
        .required(),
    status: Yup.string().required("Board is required"),
});

const inputBase    = "w-full px-3 py-2.5 text-sm rounded-lg border text-slate-800 outline-none transition-all bg-slate-50";
const inputNormal  = "border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:bg-white";
const inputErrCls  = "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100";

function TicketModal({ ticket, onClose }) {
    const dispatch = useDispatch();
    const boards   = useSelector(state => state.kanban.boards);

    const formik = useFormik({
        // KEY FIX: enableReinitialize makes Formik re-read initialValues
        // whenever the ticket prop changes (new ticket opened)
        enableReinitialize: true,
        initialValues: {
            title:       ticket.title        ?? "",
            description: ticket.description  ?? "",
            priority:    ticket.priority     ?? "medium",
            status:      ticket.status       ?? "",
        },
        validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            dispatch(editTicket({
                id:          ticket.id,
                title:       values.title.trim(),
                description: values.description.trim(),
                priority:    values.priority,
                status:      values.status,
            }));
            setSubmitting(false);
            onClose();
        },
    });

    const fieldErr = (name) => formik.touched[name] && formik.errors[name];

    return (
        <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[300] flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl w-[460px] max-w-[95vw] shadow-2xl overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                    <h2 className="text-base font-bold text-slate-800">Edit Ticket</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-sm
                                   bg-slate-100 text-slate-400 hover:bg-red-100 hover:text-red-500 transition-colors"
                    >✕</button>
                </div>

                <form onSubmit={formik.handleSubmit} noValidate>
                    <div className="flex flex-col gap-4 px-6 py-5">

                        {/* Title */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="title"
                                placeholder="e.g. Fix login bug"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`${inputBase} ${fieldErr('title') ? inputErrCls : inputNormal}`}
                            />
                            {fieldErr('title') && (
                                <p className="text-xs text-red-500 font-medium">{formik.errors.title}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                Description
                            </label>
                            <textarea
                                name="description"
                                placeholder="What needs to be done?"
                                rows={3}
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`${inputBase} resize-none ${fieldErr('description') ? inputErrCls : inputNormal}`}
                            />
                            {fieldErr('description') && (
                                <p className="text-xs text-red-500 font-medium">{formik.errors.description}</p>
                            )}
                        </div>

                        {/* Priority + Board */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                    Priority
                                </label>
                                <select
                                    name="priority"
                                    value={formik.values.priority}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`${inputBase} ${inputNormal} cursor-pointer`}
                                >
                                    <option value="high">🔴 High</option>
                                    <option value="medium">🟡 Medium</option>
                                    <option value="low">🟢 Low</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                    Board
                                </label>
                                <select
                                    name="status"
                                    value={formik.values.status}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`${inputBase} ${inputNormal} cursor-pointer`}
                                >
                                    {boards.map(b => (
                                        <option key={b.status} value={b.status}>{b.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-2.5 px-6 py-4 border-t border-slate-100 bg-slate-50">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-sm font-semibold rounded-lg
                                       bg-slate-100 text-slate-500 hover:bg-slate-200 active:scale-95 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={formik.isSubmitting || !formik.isValid && formik.submitCount > 0}
                            className="px-5 py-2.5 text-sm font-semibold rounded-lg
                                       bg-blue-500 text-white shadow-sm shadow-blue-200
                                       hover:bg-blue-600 active:scale-95 transition-all disabled:opacity-50"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TicketModal;