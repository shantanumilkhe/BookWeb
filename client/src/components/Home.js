import React, { useCallback, useState } from 'react'
import mammoth from 'mammoth/mammoth.browser';
import './styles.scss'

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from '@tiptap/extension-bold'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Code from '@tiptap/extension-code'
import Highlight from '@tiptap/extension-highlight';
import TextStyle from '@tiptap/extension-text-style';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import Strike from '@tiptap/extension-strike';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import Underline from '@tiptap/extension-underline';
import { Color } from '@tiptap/extension-color'
import Blockquote from '@tiptap/extension-blockquote'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import Heading from '@tiptap/extension-heading';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Gapcursor from '@tiptap/extension-gapcursor'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import OrderedList from '@tiptap/extension-ordered-list'
import FontFamily from '@tiptap/extension-font-family';
import TextAlign from '@tiptap/extension-text-align'

const Home = () => {
  const [editorContent, setEditorContent] = useState("");

  const sendData = () => {
    console.log(editorContent);
  }
  const editor = useEditor({
    extensions: [StarterKit, Document, Paragraph, Text, Bold, Code, TextStyle, Italic, Strike, Subscript, Superscript, Underline, Highlight.configure({ multicolor: true }), Link.configure({ openOnClick: false, }), BulletList, ListItem, Blockquote, Heading.configure({ levels: [1, 2, 3], }), HorizontalRule, Image.configure({ inline: true,allowBase64: true, }), Dropcursor, Gapcursor, Table.configure({ resizable: true, }), TableRow, TableHeader, TableCell, OrderedList, FontFamily, TextAlign.configure({ types: ['heading', 'paragraph'] }), Color],
    onUpdate({ editor }) {
      setEditorContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "Editor"
      }
    },
    content: '',
  });
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
  }, [editor])
  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const onButtonClick = useCallback((e) => {
    if (e.target.files.length > 0) {
      let filename = URL.createObjectURL(e.target.files[0]);
      fetch(filename).then(res => res.arrayBuffer()).then(ab =>
        mammoth.convertToHtml({ arrayBuffer: ab }).then(function (result) {
          var html = result.value;
          editor.commands.setContent(html)
          setEditorContent(html)
        })
          .done())
    }

  }, [editor])
  if (!editor) {
    return null;
  }
  return (
    <div>
      <div><input type="file" accept='.docx' onChange={onButtonClick} /></div>

      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active bg-blue-100 border-solid border-2 border-black rounded w-8' : 'hover:bg-gray-100 border-solid border-2 border-black rounded w-8'}
      >
        <i className="ri-bold"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active bg-blue-100 border-solid border-2 border-black rounded w-8' : 'hover:bg-gray-100 border-solid border-2 border-black rounded w-8'}
      >
        <i className="ri-code-view"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={editor.isActive('highlight') ? 'is-active bg-blue-100 border-solid border-2 border-black rounded w-8' : 'hover:bg-gray-100 border-solid border-2 border-black rounded w-8'}
      >
        <box-icon name='highlight' size='sm' className='bx-fw'></box-icon>
      </button>
      {/* <input
        type="color"
        onInput={event => editor.chain().focus().toggleHighlight({color:event.target.value}).run()}
        className={editor.isActive('highlight') ? 'is-active bg-blue-100 border-solid border-2 border-black rounded w-8' : 'hover:bg-gray-100 border-solid border-2 border-black rounded w-8'}
        value={editor.getAttributes('textStyle').color}
      /> */}
      {/* <input
        type="color"
        onInput={event => editor.chain().focus().setColor(event.target.value).run()}
        value={editor.getAttributes('textStyle').color}
      /> */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active bg-blue-100 border-solid border-2 border-black rounded w-8' : 'hover:bg-gray-100 border-solid border-2 border-black rounded w-8'}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active bg-blue-100 border-solid border-2 border-black rounded w-8' : 'hover:bg-gray-100 border-solid border-2 border-black rounded w-8'}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active bg-blue-100 border-solid border-2 border-black rounded w-8' : 'hover:bg-gray-100 border-solid border-2 border-black rounded w-8'}
      >
        H3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active bg-blue-100 border-solid border-2 border-black rounded w-8' : 'hover:bg-gray-100 border-solid border-2 border-black rounded w-8'}
      >
        <i className="ri-italic"></i>
      </button>
      <button onClick={setLink} className={editor.isActive('link') ? 'is-active bg-blue-100 border-solid border-2 border-black rounded w-8' : 'hover:bg-gray-100 border-solid border-2 border-black rounded w-8'}>
        <i className="ri-link"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active bg-blue-100 border-solid border-2 border-black rounded w-8' : 'hover:bg-gray-100 border-solid border-2 border-black rounded w-8'}
      >
        <i className="ri-strikethrough"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        className={editor.isActive('subscript') ? 'is-active bg-blue-100 border-solid border-2 border-black rounded w-8' : 'hover:bg-gray-100 border-solid border-2 border-black rounded w-8'}
      >
        <i className="ri-subscript"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        className={editor.isActive('superscript') ? 'is-active bg-blue-100 border-solid border-2 border-black rounded w-8' : 'hover:bg-gray-100 border-solid border-2 border-black rounded w-8'}
      >
        <i className="ri-superscript"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'is-active bg-blue-100 border-solid border-2 border-black rounded w-8' : 'hover:bg-gray-100 border-solid border-2 border-black rounded w-8'}
      >
        <i className="ri-underline"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active bg-blue-100 border-solid border-2 border-black rounded w-8' : 'hover:bg-gray-100 border-solid border-2 border-black rounded w-8'}
      >
        <i className="ri-double-quotes-l"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active bg-blue-100 border-solid border-2 border-black rounded w-8' : 'hover:bg-gray-100 border-solid border-2 border-black rounded w-8'}
      >
        <i className="ri-list-unordered"></i>
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        setHorizontalRule
      </button>
      <button onClick={addImage} className='hover:bg-gray-100 border-solid border-2 border-black rounded w-8'><div><box-icon name='image-alt'></box-icon></div></button>
      <button
        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
        }
      >
        insertTable
      </button>
      <button onClick={() => editor.chain().focus().addColumnBefore().run()}>
        addColumnBefore
      </button>
      <button onClick={() => editor.chain().focus().addColumnAfter().run()}>addColumnAfter</button>
      <button onClick={() => editor.chain().focus().deleteColumn().run()}>deleteColumn</button>
      <button onClick={() => editor.chain().focus().addRowBefore().run()}>addRowBefore</button>
      <button onClick={() => editor.chain().focus().addRowAfter().run()}>addRowAfter</button>
      <button onClick={() => editor.chain().focus().deleteRow().run()}>deleteRow</button>
      <button onClick={() => editor.chain().focus().deleteTable().run()}>deleteTable</button>
      <button onClick={() => editor.chain().focus().mergeCells().run()}>mergeCells</button>
      <button onClick={() => editor.chain().focus().splitCell().run()}>splitCell</button>
      <button onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>
        toggleHeaderColumn
      </button>
      <button onClick={() => editor.chain().focus().toggleHeaderRow().run()}>
        toggleHeaderRow
      </button>
      <button onClick={() => editor.chain().focus().toggleHeaderCell().run()}>
        toggleHeaderCell
      </button>
      <button onClick={() => editor.chain().focus().mergeOrSplit().run()}>mergeOrSplit</button>
      <button onClick={() => editor.chain().focus().setCellAttribute('colspan', 2).run()}>
        setCellAttribute
      </button>
      <button onClick={() => editor.chain().focus().fixTables().run()}>fixTables</button>
      <button onClick={() => editor.chain().focus().goToNextCell().run()}>goToNextCell</button>
      <button onClick={() => editor.chain().focus().goToPreviousCell().run()}>
        goToPreviousCell
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active bg-blue-100 border-solid border-2 border-black rounded w-8' : 'hover:bg-gray-100 border-solid border-2 border-black rounded w-8'}
      >
        <i className="ri-list-ordered"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().setFontFamily('Inter').run()}
        className={editor.isActive('textStyle', { fontFamily: 'Inter' }) ? 'is-active bg-blue-100 border-solid border-2 border-black rounded w-8' : 'hover:bg-gray-100 border-solid border-2 border-black rounded w-8'}
      >
        Inter
      </button>
      <button
        onClick={() => editor.chain().focus().setFontFamily('Comic Sans MS, Comic Sans').run()}
        className={
          editor.isActive('textStyle', { fontFamily: 'Comic Sans MS, Comic Sans' })
            ? 'is-active'
            : ''
        }
      >
        Comic Sans
      </button>
      <button
        onClick={() => editor.chain().focus().setFontFamily('serif').run()}
        className={editor.isActive('textStyle', { fontFamily: 'serif' }) ? 'is-active bg-blue-100 border-solid border-2 border-black rounded w-8' : 'hover:bg-gray-100 border-solid border-2 border-black rounded w-8'}
      >
        serif
      </button>
      <button
        onClick={() => editor.chain().focus().setFontFamily('monospace').run()}
        className={editor.isActive('textStyle', { fontFamily: 'monospace' }) ? 'is-active bg-blue-100 border-solid border-2 border-black rounded w-8' : 'hover:bg-gray-100 border-solid border-2 border-black rounded w-8'}
      >
        monospace
      </button>
      <button
        onClick={() => editor.chain().focus().setFontFamily('cursive').run()}
        className={editor.isActive('textStyle', { fontFamily: 'cursive' }) ? 'is-active bg-blue-100 border-solid border-2 border-black rounded w-8' : 'hover:bg-gray-100 border-solid border-2 border-black rounded w-8'}
      >
        cursive
      </button>
      <button onClick={() => editor.chain().focus().unsetFontFamily().run()}>
        unsetFontFamily
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={editor.isActive({ textAlign: 'left' }) ? 'is-active bg-blue-100 border-solid border-2 border-black rounded w-8' : 'hover:bg-gray-100 border-solid border-2 border-black rounded w-8'}
      >
        <i className="ri-align-left"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={editor.isActive({ textAlign: 'center' }) ? 'is-active bg-blue-100 border-solid border-2 border-black rounded w-8' : 'hover:bg-gray-100 border-solid border-2 border-black rounded w-8'}
      >
        <i className="ri-align-center"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={editor.isActive({ textAlign: 'right' }) ? 'is-active bg-blue-100 border-solid border-2 border-black rounded w-8' : 'hover:bg-gray-100 border-solid border-2 border-black rounded w-8'}
      >
        <i className="ri-align-right"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={editor.isActive({ textAlign: 'justify' }) ? 'is-active bg-blue-100 border-solid border-2 border-black rounded w-8' : 'hover:bg-gray-100 border-solid border-2 border-black rounded w-8'}
      >
        <i className="ri-align-justify"></i>
      </button>
      <EditorContent editor={editor} />
      <button type='button' className='bg-blue-800 rounded text-white' onClick={sendData}>Send</button>
    </div>
  )
}

export default Home