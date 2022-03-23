import { useEditor, EditorContent } from "@tiptap/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../context/Modal";
import { editNote } from "../store/notes";
import { hideModal, showModal } from "../store/selected";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import StarterKit from "@tiptap/starter-kit";

export default function NotesEditor() {
	const dispatch = useDispatch();
	let note = useSelector(state => state.selected.note);
	const modal = useSelector(state => state.selected.modal);

	const [title, setTitle] = useState(note.title);
	const [content, setContent] = useState(note.content);

	const editor = useEditor({
		extensions: [
			StarterKit
		],
		content: note.content,
		onUpdate: ({ editor }) => setContent(editor.getJSON())
	})

	useEffect(() => {
		document.title = "Notes - Evernote Clone";
	}, [])

	useEffect(() => {
		setTitle(note.title);
		setContent(note.content);
		editor?.commands.setContent(note.content);
	}, [note])

	return (
		<div id="editor-container" onClick={e => dispatch(hideModal())}>
			<input placeholder="Title" id="title-input"
				disabled={!note}
				value={title}
				onChange={e => setTitle(e.target.value)}
				onBlur={e => dispatch(editNote({ noteId: note.id, notebookId: null, title, content }))}
			/>
			<div id="content-textarea" >
				<button
					onClick={() => editor.chain().focus().toggleBold().run()}
					className={editor?.isActive('bold') ? 'is-active' : ''}
				>
					bold
				</button>
				<button
					onClick={() => editor.chain().focus().toggleItalic().run()}
					className={editor?.isActive('italic') ? 'is-active' : ''}
				>
					italic
				</button>
				<button
					onClick={() => editor.chain().focus().toggleStrike().run()}
					className={editor?.isActive('strike') ? 'is-active' : ''}
				>
					strike
				</button>
				<button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
					clear marks
				</button>
				<button
					onClick={() => editor.chain().focus().setParagraph().run()}
					className={editor?.isActive('paragraph') ? 'is-active' : ''}
				>
					paragraph
				</button>
				<button
					onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
					className={editor?.isActive('heading', { level: 1 }) ? 'is-active' : ''}
				>
					h1
				</button>
				<button
					onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
					className={editor?.isActive('heading', { level: 2 }) ? 'is-active' : ''}
				>
					h2
				</button>
				<button
					onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
					className={editor?.isActive('heading', { level: 3 }) ? 'is-active' : ''}
				>
					h3
				</button>
				<button
					onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
					className={editor?.isActive('heading', { level: 4 }) ? 'is-active' : ''}
				>
					h4
				</button>
				<button
					onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
					className={editor?.isActive('heading', { level: 5 }) ? 'is-active' : ''}
				>
					h5
				</button>
				<button
					onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
					className={editor?.isActive('heading', { level: 6 }) ? 'is-active' : ''}
				>
					h6
				</button>
				<button
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					className={editor?.isActive('bulletList') ? 'is-active' : ''}
				>
					bullet list
				</button>
				<button
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					className={editor?.isActive('orderedList') ? 'is-active' : ''}
				>
					ordered list
				</button>
				<button
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
					className={editor?.isActive('blockquote') ? 'is-active' : ''}
				>
					blockquote
				</button>
				<button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
					horizontal rule
				</button>
				<button onClick={() => editor.chain().focus().setHardBreak().run()}>
					hard break
				</button>
				<button onClick={() => editor.chain().focus().undo().run()}>
					undo
				</button>
				<button onClick={() => editor.chain().focus().redo().run()}>
					redo
				</button>
				<EditorContent editor={editor} />
			</div>
			<button id="delete" className="delete-style"
				disabled={!note}
				onClick={e => {
					e.stopPropagation();
					dispatch(showModal("confirmDelete"));
				}}>Delete</button>
			{modal === "confirmDelete" && (
				<Modal onClose={e => dispatch(hideModal())}>
					<ConfirmDeleteModal noteId={note.id} />
				</Modal>
			)}
		</div>
	)
}
