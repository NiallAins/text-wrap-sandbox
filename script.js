const
    para = document.getElementById('para'),
    text = document.getElementById('text'),
    options = [
        {
            name: 'width',
            options: ['unset', '120px', 'min-content', 'max-content', 'fit-content'],
            value: 1
        },
        {
            name: 'height',
            options: ['unset', '120px', 'auto', 'min-content', 'max-content', 'fit-content'],
            value: 1
        },
        {
            name: 'overflow',
            options: ['unset', 'visible', 'hidden', 'scroll', 'auto'],
            value: 1
        },
        {
            name: 'overflowWrap',
            options: ['unset', 'normal', 'anywhere', 'break-word'],
            value: 0
        },
        {
            name: 'whiteSpace',
            options: ['unset', 'pre', 'pre-wrap', 'pre-line', 'normal', 'nowrap'],
            value: 0
        },
        {
            name: 'wordBreak',
            options: ['unset', 'normal', 'break-all', 'break-word'],
            value: 0
        },
        {
            name: 'textOverflow',
            options: ['unset', 'clip', 'ellipsis'],
            notes: 'requies overflow: hidden',
            value: 0
        },
        {
            name: 'hyphens',
            options: ['unset', 'manual', 'none', 'auto'],
            notes: 'none ignores soft hyphens',
            value: 0
        }
    ];

let
    url = window.location.href,
    opts = window.location.href.match(/(&?tdf=)[^&]*/);
if (opts) {
    opts[0]
        .split()
        .forEach((n, i) => {
            options[i].value = n;
        });
}

text.value = `In Wicklow lies Newtownmountkennedy, sometimes spelt Newtown-mount-kennedy. 
<br/>
Soft hyphens only appear before a break in Newtown&shy;mount&shy;kennedy.
<br/>
And&nbsp;this&nbsp;line&nbsp;won't&nbsp;break`;
text.onkeyup = () => para.innerHTML = text.value;
text.onkeyup();

function setOption(n, o) {
    options[n].value = o;
    para.style[options[n].name] = options[n].options[o];
    url = url.replace(
        /(&?tdf=)[^&]*/,
        '$1' +
        options.reduce((str, op, i) => str, op.value)
    )
    
}

document.getElementById('controls').innerHTML +=
    options.reduce(
        (html, p, pi) => html + `
            <div class="grid__controls-row">
                <span class="label">
                    ${p.name.replace(/([A-Z])/g, '-$1').toLowerCase()}:
                </span>
                <span class="grid__controls-inputs">
                    ${p.options.reduce(
                        (input, o, i) => input + `
                            <span class="input">
                                <input
                                    id="${p.name + i}"
                                    type="radio"
                                    ${i === p.value ? 'checked' : ''}
                                    name="${p.name}"
                                    onclick="setOption(${pi}, ${i})"
                                />
                                <label for="${p.name + i}">${o}</label>
                            </span>
                        `,
                        ''
                    )}
                </span>
            </div>
            <a
                target="black"
                href="https://developer.mozilla.org/en-US/docs/Web/CSS/${p.name.replace(/([A-Z])/g, '-$1').toLowerCase()}"
            >
                Docs
            </a>
            ${p.notes ? `<i>${p.notes}</i>` : ''}`,
        ''
    ) + 
    `<button
        class="switch"
        onclick="toggleDark()"
    >
        Light Switch
    </button>`;

let isDark = true;
function toggleDark() {
    isDark = !isDark;
    document.body.style.background = isDark ? '#20202a' : '#fff';
    document.body.style.color = isDark ? '#fff' : '#000';
}