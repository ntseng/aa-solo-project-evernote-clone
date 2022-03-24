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

	const editor = useEditor({
		extensions: [
			StarterKit
		],
		onUpdate: ({ editor }) => { dispatch(editNote({ noteId: note.id, notebookId: null, content: editor.getHTML(), plainContent: editor.getText() })) }
	})

	useEffect(() => {
		document.title = "Notes - Evernote Clone";
	}, [])

	useEffect(() => {
		setTitle(note.title);
		editor?.commands.setContent(note.content);
	}, [note, editor])

	return (
		<div id="editor-container" onClick={e => dispatch(hideModal())}>
			<input placeholder="Title" id="title-input"
				disabled={!note}
				value={title}
				onChange={e => setTitle(e.target.value)}
				onBlur={e => dispatch(editNote({ noteId: note.id, notebookId: null, title }))}
			/>
			<div id="content-textarea" >
				<p id="editor-actions">
					<button title="Bold"
						onClick={() => editor.chain().focus().toggleBold().run()}
						className={`editor-button${editor?.isActive('bold') ? ' is-active' : ''}`}
					>
						<i class="fa-solid fa-bold" />
					</button>
					<button title="Italics"
						onClick={() => editor.chain().focus().toggleItalic().run()}
						className={`editor-button${editor?.isActive('italic') ? ' is-active' : ''}`}
					>
						<i class="fa-solid fa-italic" />
					</button>
					<button title="Strikethrough"
						onClick={() => editor.chain().focus().toggleStrike().run()}
						className={`editor-button${editor?.isActive('strike') ? ' is-active' : ''}`}
					>
						<i class="fa-solid fa-strikethrough" />
					</button>
					<button title="Clear Formatting"
						onClick={() => editor.chain().focus().unsetAllMarks().run()}
						className="editor-button"
					>
						<i class="fa-solid fa-text-slash" />
					</button>
					<button title="Heading 1"
						onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
						className={`editor-button${editor?.isActive('heading', { level: 1 }) ? ' is-active' : ''}`}
					>
						h1
					</button>
					<button title="Heading 2"
						onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
						className={`editor-button${editor?.isActive('heading', { level: 2 }) ? ' is-active' : ''}`}
					>
						h2
					</button>
					<button title="Heading 3"
						onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
						className={`editor-button${editor?.isActive('heading', { level: 3 }) ? ' is-active' : ''}`}
					>
						h3
					</button>
					<button title="Heading 4"
						onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
						className={`editor-button${editor?.isActive('heading', { level: 4 }) ? ' is-active' : ''}`}
					>
						h4
					</button>
					<button title="Heading 5"
						onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
						className={`editor-button${editor?.isActive('heading', { level: 5 }) ? ' is-active' : ''}`}
					>
						h5
					</button>
					<button title="Heading 6"
						onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
						className={`editor-button${editor?.isActive('heading', { level: 6 }) ? ' is-active' : ''}`}
					>
						h6
					</button>
					<button title="Unordered List"
						onClick={() => editor.chain().focus().toggleBulletList().run()}
						className={`editor-button${editor?.isActive('bulletList') ? ' is-active' : ''}`}
					>
						<i class="fa-solid fa-list" />
					</button>
					<button title="Ordered List"
						onClick={() => editor.chain().focus().toggleOrderedList().run()}
						className={`editor-button${editor?.isActive('orderedList') ? ' is-active' : ''}`}
					>
						<i class="fa-solid fa-list-ol" />
					</button>
					<button title="Blockquote"
						onClick={() => editor.chain().focus().toggleBlockquote().run()}
						className={`editor-button${editor?.isActive('blockquote') ? ' is-active' : ''}`}
					>
						<i class="fa-solid fa-quote-left" />
					</button>
					<button title="Horizontal Rule"
						onClick={() => editor.chain().focus().setHorizontalRule().run()}
						className="editor-button"
					>
						<i class="fa-solid fa-ruler-horizontal" />
					</button>
					<button title="Hard Break"
						onClick={() => editor.chain().focus().setHardBreak().run()}
						className="editor-button"
					>
						{"<br>"}
					</button>
					<button title="Undo"
						onClick={() => editor.chain().focus().undo().run()}
						className="editor-button"
					>
						<i class="fa-solid fa-rotate-left" />
					</button>
					<button title="Redo	"
						onClick={() => editor.chain().focus().redo().run()}
						className="editor-button"
					>
						<i class="fa-solid fa-rotate-right" />
					</button>
				</p>
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
