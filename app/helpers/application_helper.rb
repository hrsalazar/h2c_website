module ApplicationHelper

	def titulo_completo(titulo_pagina)
		titulo_base = "H2Consulting"
		if titulo_base.empty?
			titulo_base
		else
			"#{titulo_base} | #{titulo_pagina}"
		end
	end
end
