with open(r'c:\Projetos\site-jessica\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Localiza o inicio e fim do bloco de paragrafos antigo
start_marker = '<div class="et_pb_text_inner"><p>Sou a Jessica'
end_marker = '</p></div>\n\t\t\t</div><div class="et_pb_button_module_wrapper'

start = content.find(start_marker)
end = content.find(end_marker, start) + len('</p></div>')

old_block = content[start:end]

new_block = (
    '<div class="et_pb_text_inner">'
    '<p>Sou a J\u00e9ssica, tatuadora em Passo Fundo. Meu foco \u00e9 a tatuagem tradicional old school: linhas marcantes, cores s\u00f3lidas e desenhos feitos para durar.</p>\n'
    '<p>Seja um desenho do meu cat\u00e1logo de dispon\u00edveis ou algo desenhado exclusivamente para voc\u00ea, dentro do estilo tradicional, qualquer ideia \u00e9 bem-vinda e pode ser executada!</p>\n'
    '<p>Se voc\u00ea curte o estilo tradicional americano ou europeu, desenhos cl\u00e1ssicos ou tatuagens com um toque de autenticidade e personalidade, entre em contato, tenho certeza que faremos uma tattoo incr\u00edvel.</p>'
    '</div>'
)

print("Bloco encontrado:", repr(old_block[:80]))
content = content.replace(old_block, new_block)

with open(r'c:\Projetos\site-jessica\index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Substituicao concluida com sucesso!')
